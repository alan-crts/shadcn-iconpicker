import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import simpleGit from "simple-git";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, "lucide-temp");

async function main() {
  console.log("🔄 Cloning Lucide repo...");

  const git = simpleGit();

  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  await git.clone("https://github.com/lucide-icons/lucide.git", TEMP_DIR, ["--depth", "1"]);

  console.log("✅ Repo cloned.");

  console.log("Get icons names...");

  const iconsJson = fs.readdirSync(path.join(TEMP_DIR, "icons"));

  const icons = iconsJson.filter(icon => icon.endsWith(".json")).map(icon => {
    const iconData = JSON.parse(fs.readFileSync(path.join(TEMP_DIR, "icons", icon), "utf-8"));

    return {
        name: icon.replace(".json", ""),
        tags: iconData.tags,
        categories: iconData.categories,
    };
  })

  const iconsDataTs = `export const iconsData: Array<{
    name: string;
    categories: string[];
    tags: string[];
}> = [
  ${icons.map(icon => `{
    "name": "${icon.name}",
    "categories": [${icon.categories.map(category => `"${category}"`).join(",")}],
    "tags": [${icon.tags.map(tag => `"${tag}"`).join(",")}]\n  }`).join(",\n  ")}
    ];`;

  fs.writeFileSync(path.join(__dirname, "..", "registry", "ui", "icons-data.ts"), iconsDataTs, "utf-8");

  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log("🧹 Temp folder removed.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
