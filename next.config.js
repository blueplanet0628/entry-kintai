/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/staff",
				permanent: true,
			},
			{
				source: "/admin",
				destination: "/admin/timecard",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
