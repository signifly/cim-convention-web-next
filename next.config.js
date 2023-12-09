/** @type {import('next').NextConfig} */
// 
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
	// We have to rewrite all paths for the default locale 
	// otherwise the locale will not be set
	rewrites(){
		return [
			{
				source: '/:path*',
				destination: '/en/:path*',
			},
		]
	}
}

module.exports = withNextIntl(nextConfig)
