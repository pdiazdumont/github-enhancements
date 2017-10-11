const templates = {
	"DOWNLOAD_LINK": "<a href=\"\">DOWNLOAD</a>",
	"REPOSITORY_ITEM": `
		<div class="col-12 d-block width-full py-4 border-bottom">
			<div class="d-inline-block mb-1">
				<h3>
					<a href="/laravel/laravel">
						<span class="text-normal">laravel / </span>laravel
					</a>
				</h3>
			</div>
			<div class="float-right">
				<div class="js-toggler-container js-social-container starring-container on">
					<form accept-charset="UTF-8" action="/laravel/laravel/unstar" class="starred js-social-form" method="post">
						<div style="margin:0;padding:0;display:inline">
							<input name="utf8" type="hidden" value="✓">
							<input name="authenticity_token" type="hidden" value="VnH+bQGMVf4agT0IT3sbkNE13FLwFCPLE68nan5vna84w+NgSpzIHISbLZDVVQv+zWtlZGTNyJxBc/6lusPn4g==">
						</div>
						<button type="submit" class="btn btn-sm  js-toggler-target" aria-label="Unstar this repository" title="Unstar laravel/laravel" data-ga-click="Repository, click unstar button, action:users#show; text:Unstar">
							<svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
							Unstar
						</button>
					</form>
					<form accept-charset="UTF-8" action="/laravel/laravel/star" class="unstarred js-social-form" method="post">
						<div style="margin:0;padding:0;display:inline">
							<input name="utf8" type="hidden" value="✓">
							<input name="authenticity_token" type="hidden" value="V/tGNBsV2U5Zs4aVl+1bovZPQrM6s8mNdo0+CeFO0PBtl8jcD4dXg4F9JHyygB7Mbka9qpS7ZBU935EPxfWsVg==">
						</div>
						<button type="submit" class="btn btn-sm  js-toggler-target" aria-label="Star this repository" title="Star laravel/laravel" data-ga-click="Repository, click star button, action:users#show; text:Star">
							<svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
							Star
						</button>
					</form>
				</div>
			</div>
			<div class="py-1">
				<p class="d-inline-block col-9 text-gray pr-4" itemprop="description">A PHP Framework For Web Artisans</p>
			</div>
			<div class="f6 text-gray mt-2">
				<span class="repo-language-color ml-0" style="background-color:#4F5D95;"></span>
				<span class="mr-3" itemprop="programmingLanguage">PHP</span>
				<a class="muted-link mr-3" href="/laravel/laravel/stargazers">
					<svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
					35,471
				</a>
				<a class="muted-link mr-3" href="/laravel/laravel/network">
					<svg aria-label="fork" class="octicon octicon-repo-forked" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
					11,643
				</a>
				Updated <relative-time datetime="2017-10-10T12:13:53Z" title="Oct 10, 2017, 7:13 AM GMT-5">11 hours ago</relative-time>
			</div>
			<div class="f6 text-gray mt-2">
				<a class="muted-link mr-3" href="">
					Tools
				</a>
			</div>
		</div>
	`
}

export default templates;
