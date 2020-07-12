<?php
function getFileData(string $filepath): string
{
  $fileCursor = fopen($filepath, 'r');
  $fileData = utf8_encode(fread($fileCursor, filesize($filepath)));
  fclose($fileCursor);
  return $fileData;
}

$encryptedData = getFileData('./generated/encryptedRsa');
// echo $encryptedData;

$publicKey = getFileData('./generated/pemPublicKey');
// echo $publicKey;

$privateKey = getFileData('./generated/pemPivateKey');
// echo $privateKey;

$encoder = openssl_get_publickey($publicKey);
$resolver = openssl_get_privatekey($privateKey);

// openssl_public_encrypt('Coucou', $encryptedData, $encoder);
// $resolvedData = null;

echo $encryptedData;
echo '-----';
var_dump($encryptedData);
echo '-----';

// $encryptedData = str_replace(array("\r", "\n"), '', $encryptedData);

// echo $encryptedData;

openssl_private_decrypt($encryptedData,$resolvedData,$resolver);

echo '-> ' . $resolvedData;

var_dump($resolvedData);