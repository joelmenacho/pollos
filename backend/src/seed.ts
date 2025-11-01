// src/seed.ts
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { Product } from "./entities/product.entity";
import { Order } from "./entities/order.entity"; // 👈 agrega
import { OrderItem } from "./entities/order-item.entity"; // 👈 agrega

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
      password: await bcrypt.hash("admin123", 10), // tu entity usa "password"
      name: "Administrador",
      role: "ADMIN", // coincide con tu enum/default 'USER' | 'ADMIN'
    });
    await userRepo.save(admin);
    console.log("✅ Admin creado:", adminEmail, "(pass: admin123)");
  } else {
    console.log("ℹ️ Admin ya existe:", adminEmail);
  }

  // Productos demo
  const count = await productRepo.count();
  if (count === 0) {
    const items = [
      { name: "Broaster", price: 20, description: "Con papas", active: true },
      {
        name: "1/4 de Pollo",
        price: 18,
        description: "Con ensalada",
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
  .then(() => {
    console.log("✅ Seed listo");
  })
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  });
