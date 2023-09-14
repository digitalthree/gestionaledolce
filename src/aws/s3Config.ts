import AWS from "aws-sdk"
import {CredentialsOptions} from "aws-sdk/lib/credentials";

export const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    region: "us-east-1",
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY as string,
    s3Url: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/`,
}

AWS.config.update({
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    } as CredentialsOptions
})

export const s3 = new AWS.S3()
