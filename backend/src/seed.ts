// src/seed.ts
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { Product } from "./entities/product.entity";
import { Order } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";

const ds = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5433),
  username: process.env.DB_USERNAME || "app",
  password: process.env.DB_PASSWORD || "app",
  database: process.env.DB_NAME || "polleria_db",
  entities: [User, Product, Order, OrderItem],
  synchronize: true,
});

async function run() {
  await ds.initialize();

  const userRepo = ds.getRepository(User);
  const productRepo = ds.getRepository(Product);

  // Admin por defecto
  const adminEmail = "admin@polleria.local";
  let admin = await userRepo.findOne({ where: { email: adminEmail } });
  if (!admin) {
    admin = userRepo.create({
      email: adminEmail,
      password: await bcrypt.hash("admin123", 10),
      name: "Administrador",
      role: "ADMIN",
    });
    await userRepo.save(admin);
    console.log("✅ Admin creado:", adminEmail, "(pass: admin123)");
  } else {
    console.log("ℹ️ Admin ya existe:", adminEmail);
  }

  // Productos demo con imagen
  const count = await productRepo.count();
  if (count === 0) {
    const items = [
      {
        name: "1 pollo entero",
        price: 59,
        description: "Con papas",
        image: "https://peruretail.sfo3.cdn.digitaloceanspaces.com/wp-content/uploads/pollo-a-la-brasa.jpg",
        active: true,
      },
      {
        name: "1/4 de Pollo",
        price: 18,
        description: "Clásico con papas y ensalada",
        image: "https://www.perudelights.com/wp-content/uploads/2012/03/pollo1.jpg",
        active: true,
      },
      {
        name: "1/2 Pollo a la Brasa",
        price: 39.9,
        description: "Clásico con papas y ensalada",
        image: "https://emofly.b-cdn.net/hbd_exvhac6ayb3ZKT/width:2048/plain/https://storage.googleapis.com/takeapp/media/cm33nnufy00080cmj0hq48xsz.jpg",
        active: true,
      },
    ].map((dto) => productRepo.create(dto));

    await productRepo.save(items);
    console.log("✅ Productos demo insertados");
  } else {
    console.log("ℹ️ Ya hay productos, no se insertan demo");
  }

  await ds.destroy();
}

run()
  .then(() => console.log("✅ Seed listo"))
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  });
