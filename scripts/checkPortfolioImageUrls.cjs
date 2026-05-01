const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const localMediaCount = await prisma.media.count({
    where: { url: { startsWith: "/" } },
  });
  const localProjectMainImageCount = await prisma.project.count({
    where: { mainImage: { startsWith: "/" } },
  });

  console.log("localMediaCount", localMediaCount);
  console.log("localProjectMainImageCount", localProjectMainImageCount);

  const examples = await prisma.project.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });

  for (const p of examples) {
    const localMedia = p.media.filter((m) => m.url.startsWith("/")).length;
    const remoteMedia = p.media.length - localMedia;
    console.log(
      `- ${p.title} mainImage=${p.mainImage.startsWith("/") ? "LOCAL" : "REMOTE"} media(local=${localMedia}, remote=${remoteMedia})`
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

