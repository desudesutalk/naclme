# [NaCl me!](http://naclme.surge.sh/) Throwaway public key cryptography.
This is a very simple application what uses [TweetNaCl-js](https://github.com/dchest/tweetnacl-js) library for doing public key cryptography in your browser. This app is best for exchanging short messages. Especially in case when you want to recieve something in private and don't want to exchange skype addresses or emails, reveal your facebook page and so on.

Each time you open this page new random key is generated for you. Nothing is stored in your browsers cookies or `localStorage`. There is also no server-side code and nothing is sent anywhere from your browser.

While being simple and small (85kb uncompressed) NaClMe uses really strong cryptography: Curve25519 for asymmetric keys, Salsa20 for message encryption and Poly1305 for data integrity check.

## Saving local copy

As this is a single file "app", instead of using hosted version you can [download NaClMe](https://github.com/desudesutalk/naclme/raw/master/index.html) and use it from your hard drive. From NaClMe itself it is also possible to download version with private key embedded into html file. In this case encryption key will be always the same.

**NOTE:** saved version with private key embedded must be kept in a safe place. There is no password protection or something like this. Anyone who get this file can decode messages sent to embedded key.

## Used Libs

1. [TweetNaCl-js](https://github.com/dchest/tweetnacl-js)
2. [Base58](https://github.com/cryptocoinjs/bs58)
3. [UTF8 codec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding#Appendix.3A_Decode_a_Base64_string_to_Uint8Array_or_ArrayBuffer)
4. [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
5. Favicon is from [Silk icon set](http://www.famfamfam.com/lab/icons/silk/)

## LICENSE

The MIT License (MIT)

Copyright (c) 2016 desudesutalk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
