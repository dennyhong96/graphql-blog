const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const s3 = new AWS.S3();

// Transform image into buffer and upload s3
const s3UploadImage = async (image, user) => {
  // Process Image data
  const imageBase64Buffer = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const imageType = image.split(";")[0].split("/")[1];

  const s3UploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `profile/${user._id.toString()}/${uuidv4()}.${imageType}`,
    Body: imageBase64Buffer, // sync -> Make sure file is loaded at the time of update
    ACL: process.env.AWS_S3_BUCKET_ACL, // public-read -> so user do can view image
    ContentType: `image/${imageType}`,
    ContentEncoding: "base64",
  };

  return await s3.upload(s3UploadParams).promise();

  //  { ...,
  //   Location: 'https://tutshare.s3.us-west-2.amazonaws.com/category/37af4ebd-7223-49c6-b7df-56f5f002dd9d',
  //   key: 'category/37af4ebd-7223-49c6-b7df-56f5f002dd9d',
  //   ... }
};

exports.uploadProfileImages = async (req, res, next) => {
  try {
    const { images } = req.body;

    const uploadPromises = images.map((image) =>
      s3UploadImage(image, req.user)
    );
    const uploadRes = await Promise.all(uploadPromises);

    res.status(201).json({
      data: { images: uploadRes.map((i) => ({ url: i.Location, key: i.Key })) },
    });
  } catch (error) {
    console.error("[uploadProfileImages]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
