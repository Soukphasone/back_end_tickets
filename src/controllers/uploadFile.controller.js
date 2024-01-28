const AWS = require('aws-sdk')
const bluebird = require('bluebird')

const { v4: uuid_v4 } = require('uuid');


const s3 = new AWS.S3({
    endpoint: 's3-ap-southeast-1.amazonaws.com',   // Put you region
    accessKeyId: process.env.AWS_ID,      // Put you accessKeyId
    secretAccessKey: process.env.AWS_SECRET, // Put you accessKeyId
    Bucket: process.env.AWS_BUCKET_NAME,        // Put your bucket name
    signatureVersion: 'v4',
    region: 'ap-southeast-1'           // Put you region
});

// AWS.config.update({
//     accessKeyId: process.env.AWS_ID,
//     secretAccessKey: process.env.AWS_SECRET
// })
// AWS.config.setPromisesDependency(bluebird)
// const _s3 = new AWS.S3()

// const s3 = _s3.getSignedUrl('putObject', {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     ACL: 'public-read',
//     ContentType: 'file/*; image/*',
//     Expires: 1000
// })



exports.getSingedUrl = async (req, res) => {
    if (!req.body.name) {
        res.status(401).json({ message: `INVALID_NAME` });
        return;
    }
    let _splitFileType = req.body.name.split("/")
    let filename = `${uuid_v4()}.${_splitFileType[1]}`
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Expires: 60 * 1
    };
    const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
            err ? reject(err) : resolve(url);
        });
    });
    res.status(200).json({ url, params });
}

exports.getSingedUrlMany = async (req, res) => {
    if (!req.body) {
        res.status(401).json({ message: `INVALID_NAME` });
        return;
    }
    let newData = [];


    for (var i = 0; i < req.body.length; i++) {
        let filename = `${uuid_v4(req.body[i].name)}.${req.body[i].type.split("/")[1]}`

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
            Expires: 60 * 1
        };

        const url = await new Promise((resolve, reject) => {
            s3.getSignedUrl('putObject', params, (err, url) => {
                err ? reject(err) : resolve(url);
            });
        });
        newData.push({ url, params })
    }
    res.status(200).json(newData);
}