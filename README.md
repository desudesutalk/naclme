# [NaCl me!](http://naclme.surge.sh/) Throwaway public key cryptography.
This is a very simple application what uses [TweetNaCl-js](https://github.com/dchest/tweetnacl-js) library for doing public key cryptography in your browser. This app is best for exchanging short messages. Especially in case when you want to recieve something in private and don't want to exchange skype addresses or emails, reveal your facebook pange and so on.

Each time you open this page new random key is generated for you. Nothing is stored in your browsers cookies or `localStorage`. There is also no server-side code and nothing is sent anywhere from your browser.
