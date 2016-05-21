"use strict";

function appendBuffer(buffer1, buffer2) {
	var tmp = new Uint8Array(buffer1.length + buffer2.length);
	tmp.set(buffer1, 0);
	tmp.set(buffer2, buffer1.length);
	return tmp;
}

var myKey = nacl.box.keyPair(),
	myKeyStr = bs58.enc(myKey.publicKey),
	rl = document.getElementById('replylink'),
	encFor;

rl.href = location.href;
rl.hash = '#' + myKeyStr;
rl.textContent = myKeyStr;

encFor = new Uint8Array(bs58.dec(location.hash.replace(/[^123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+/g, '')));

if (encFor.length == nacl.box.publicKeyLength) {
	document.getElementById('tokey').value = bs58.enc(encFor);

	document.getElementById('nav-recieve').classList.remove('active');
	document.getElementById('cont-recieve').classList.add('hidden');
	document.getElementById('cont-send').classList.remove('hidden');
	document.getElementById('nav-send').classList.add('active');
	document.getElementById('nav-about').classList.remove('active');
	document.getElementById('cont-about').classList.add('hidden');
}

window.onload = function() {
	document.getElementById('encode').onclick = function() {
		var eKey = nacl.box.keyPair(),
			addr = new Uint8Array(bs58.dec(document.getElementById('tokey').value)),
			msg = strToUTF8Arr(document.getElementById('forencode').value),
			nonce = new Uint8Array(eKey.publicKey.buffer, 0, 24),
			i, box, cont;

		if (addr.length != nacl.box.publicKeyLength) {
			alert('Please provide valid key for encryption.');
			return;
		}

		if (msg.length === 0) {
			alert('Please enter some text.');
			return;
		}

		box = nacl.box(msg, nonce, addr, eKey.secretKey);

		cont = appendBuffer(eKey.publicKey, box);

		document.getElementById('forencode').value = '';

		var txt = document.createElement('pre'),
			parent = document.getElementById('encoded-messages');
		txt.textContent = '----------------------------------------------------------------\n' +
			bs58.enc(cont).match(/.{1,64}/g).join('\n') +
			'\n--------------------------------------------------------------';

		parent.insertBefore(txt, parent.firstChild);
		document.getElementById('encode-another').classList.remove('hidden');
		document.getElementById('encode-form').classList.add('hidden');
	};

	document.getElementById('decode').onclick = function() {
		var cont = new Uint8Array(bs58.dec(document.getElementById('fordecode').value.replace(/[^123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+/g, '')));

		if (cont.length <= nacl.box.overheadLength + nacl.box.publicKeyLength) {
			alert('Can\' decrypt. Message too short or broken.');
			return;
		}

		var eKey = new Uint8Array(cont.buffer, 0, nacl.box.publicKeyLength),
			nonce = new Uint8Array(cont.buffer, 0, nacl.box.nonceLength),
			box = new Uint8Array(cont.buffer, nacl.box.publicKeyLength),
			i, msg;

		msg = nacl.box.open(box, nonce, eKey, myKey.secretKey);

		if (!msg) {
			alert('Can\' decrypt. Message is not for current key or broken.');
			return;
		}

		document.getElementById('fordecode').value = '';

		var txt = document.createElement('pre'),
			parent = document.getElementById('decoded-messages');
		txt.textContent = utf8ArrToStr(msg)

		parent.insertBefore(txt, parent.firstChild);
		document.getElementById('decode-another').classList.remove('hidden');
		document.getElementById('decode-form').classList.add('hidden');
	};
};

function naviswitch(e) {
	e.preventDefault();
	e.target.classList.add('active');

	if (e.target.id == 'nav-recieve') {
		document.getElementById('cont-recieve').classList.remove('hidden');
	} else {
		document.getElementById('nav-recieve').classList.remove('active');
		document.getElementById('cont-recieve').classList.add('hidden');
	}

	if (e.target.id == 'nav-send') {
		document.getElementById('cont-send').classList.remove('hidden');
	} else {
		document.getElementById('nav-send').classList.remove('active');
		document.getElementById('cont-send').classList.add('hidden');
	}

	if (e.target.id == 'nav-about') {
		document.getElementById('cont-about').classList.remove('hidden');
	} else {
		document.getElementById('nav-about').classList.remove('active');
		document.getElementById('cont-about').classList.add('hidden');
	}
}

document.getElementById('nav-recieve').onclick = naviswitch;
document.getElementById('nav-send').onclick = naviswitch;
document.getElementById('nav-about').onclick = naviswitch;

document.querySelector('#decode-another a').onclick = function(e) {
	e.preventDefault();
	document.getElementById('decode-another').classList.add('hidden');
	document.getElementById('decode-form').classList.remove('hidden');
};

document.querySelector('#encode-another a').onclick = function(e) {
	e.preventDefault();
	document.getElementById('encode-another').classList.add('hidden');
	document.getElementById('encode-form').classList.remove('hidden');
};

document.getElementById('tokey').onchange = function(e) {
	var m = e.target.value.match(/#([a-z0-9]+)$/i)
	console.log(e.target.value, m);
	if (m) e.target.value = m[1];
	e.target.value = e.target.value.replace(/[^123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+/g, '');
}
