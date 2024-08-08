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
      },
      autodeploy: {
        target(event) {
          if (event.type === "branch" && event.branch === "main" && event.action === "pushed") {
            return {
              stage: "production",
              runner: { engine: "codebuild", compute: "large" }
            };
          }
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
