import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  // クリーンアップ
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  // 暗号化
  const hashedPassword = await bcrypt.hash("password123", 12);
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2600/400",
  ];

  // ユーザ作成
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "初めてのブログ投稿",
            content:
              "これは初めてのブログ投稿です。Next.jsとPrismaでブログを作成しています",
            topImage: dummyImages[0],
            published: true,
          },
          {
            title: "２番目のブログ投稿",
            content:
              "これは2番目のブログ投稿です。認証機能やダッシュボードを追加予定です",
            topImage: dummyImages[1],
            published: true,
          },
        ],
      },
    },
  });
  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
