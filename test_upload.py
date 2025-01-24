import boto3
import os
from botocore.exceptions import NoCredentialsError

bucket_name = 'dunne-eco'
file_name = 'test.txt'
object_name = 'test-upload.txt'

# Create a test file
with open(file_name, 'w') as file:
    file.write("Testing S3 upload")

try:
    # Configure S3 client
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name='eu-west-1'
    )

    # Upload the file
    s3.upload_file(file_name, bucket_name, object_name)
    print(f"File {file_name} uploaded to {bucket_name}/{object_name}")
except NoCredentialsError:
    print("AWS credentials not available")
except Exception as e:
    print(f"An error occurred: {e}")
