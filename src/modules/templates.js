const templates = {
	"DOWNLOAD_NODE": '<a href="https://raw.githubusercontent.com/${username}/${repository}/${branch}/${path}/${fileName}" class="tooltipped tooltipped-n" aria-label="Download file" download><svg aria-hidden="true" class="octicon octicon-cloud-download" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg></a>',
	"FILE_NODE": '<span>${bytes} ${text}</span>'
}

function formatter(literals, ...substitutions) {
    return {
        format: function() {
            var out = [];
            for(var i=0, k=0; i < literals.length; i++) {
                out[k++] = literals[i];
                out[k++] = arguments[substitutions[i]];
            }
            out[k] = literals[i];
            return out.join("");
        }
    };
}

export { templates }
