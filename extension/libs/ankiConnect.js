function ankiConnectInvoke(action, params={}) {
	const version = 6;
	return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => {
		document.querySelector(".card").innerHTML='<div class="alert alert-danger" role="alert">Make sure that anki is running and <a href="https://ankiweb.net/shared/info/2055492159" class="alert-link">ankiConnect</a> is installed, ankiTab won\'t work otherwise.</div>';
		reject('failed to connect to AnkiConnect')
	});
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                    throw response.error;
                } else {
                    if (response.hasOwnProperty('result')) {
                        resolve(response.result);
                    } else {
                        console.log('failed to get results from AnkiConnect');
                    }
                }
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
        xhr.open('POST', 'http://localhost:8765');
        xhr.send(JSON.stringify({action, version, params}));
	});
}

export default ankiConnectInvoke;
