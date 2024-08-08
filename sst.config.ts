/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "next-demo",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1"
        }
      }
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      public: true
    });
    new sst.aws.Nextjs("MyWeb", {
      link: [bucket]
    });
  },
});
