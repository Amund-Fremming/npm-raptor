const fs = require("fs");

function generateFiles(modelNames) {
  const filesPromises = modelNames.map((model) =>
    createFilesFor(model, modelNames)
  );

  return Promise.all(filesPromises);
}

const PATH_BASE = "./RaptorProject";
async function createFilesFor(name, modelNames) {
  try {
    await createModel(name);
    await createRepository(name);
    await createInterface(name);
    await createService(name);
    await createController(name);
    await createDbContext(name, modelNames);
    await createProgramFile(modelNames);
  } catch (error) {
    console.error(`Error in createFilesFor: ${error}`);
    throw error;
  }
}

async function createModel(name) {
  try {
    const writeStream = fs.createWriteStream(`${PATH_BASE}/${name}/${name}.cs`);

    writeStream.write("using System;\n\n");
    writeStream.write(`namespace ${name}Entity;\n\n`);
    writeStream.write(`public class ${name}\n`);
    writeStream.write(`{\n\n`);
    writeStream.write(`}`);

    writeStream.end();
  } catch (error) {
    console.error(`Error in createModel: ${error}`);
    throw error;
  }
}

async function createRepository(name) {
  try {
    const writeStream = fs.createWriteStream(
      `${PATH_BASE}/${name}/${name}Repository.cs`
    );

    writeStream.write("using System;\n");
    writeStream.write("using Data;\n\n");
    writeStream.write(`namespace ${name}Entity;\n\n`);
    writeStream.write(`public class ${name}Repository(AppDbContext context)\n`);
    writeStream.write(`{\n`);
    writeStream.write(`    public readonly AppDbContext _context = context;\n`);
    writeStream.write(`}`);

    writeStream.end();
  } catch (error) {
    console.error(`Error in createRepository: ${error}`);
    throw error;
  }
}

async function createInterface(name) {
  try {
    const writeStream = fs.createWriteStream(
      `${PATH_BASE}/${name}/I${name}Service.cs`
    );

    writeStream.write("using System;\n\n");
    writeStream.write(`namespace ${name}Entity;\n\n`);
    writeStream.write(`public interface I${name}Service\n`);
    writeStream.write(`{\n\n`);
    writeStream.write(`}`);

    writeStream.end();
  } catch (error) {
    console.error(`Error in createInterface: ${error}`);
    throw error;
  }
}

async function createService(name) {
  try {
    const writeStream = fs.createWriteStream(
      `${PATH_BASE}/${name}/${name}Service.cs`
    );

    writeStream.write("using System;\n\n");
    writeStream.write(`namespace ${name}Entity;\n\n`);
    writeStream.write(
      `public class ${name}Service(${name}Repository ${name.toLowerCase()}Repository) : I${name}Service\n`
    );
    writeStream.write(`{\n`);
    writeStream.write(
      `    public readonly ${name}Repository _${name.toLowerCase()}Repository = ${name.toLowerCase()}Repository;\n`
    );
    writeStream.write(`}`);

    writeStream.end();
  } catch (error) {
    console.error(`Error in createService: ${error}`);
    throw error;
  }
}

async function createController(name) {
  try {
    const writeStream = fs.createWriteStream(
      `${PATH_BASE}/${name}/${name}Controller.cs`
    );

    writeStream.write("using Microsoft.AspNetCore.Mvc;\n");
    writeStream.write(`using ${name}Entity;\n`);
    writeStream.write("using System;\n\n");
    writeStream.write(`namespace ${name}Entity;\n\n`);
    writeStream.write(`[ApiController]\n`);
    writeStream.write(`[Route("api/[controller]")]\n`);
    writeStream.write(
      `public class ${name}Controller(I${name}Service ${name.toLowerCase()}Service) : ControllerBase\n`
    );
    writeStream.write(`{\n`);
    writeStream.write(
      `    public readonly I${name}Service _${name.toLowerCase()}Service = ${name.toLowerCase()}Service;\n`
    );

    writeStream.write(`}`);

    writeStream.end();
  } catch (error) {
    console.error(`Error in createService: ${error}`);
    throw error;
  }
}

async function createDbContext(name, modelNames) {
  try {
    const writeStream = fs.createWriteStream(
      `${PATH_BASE}/Data/AppDbContext.cs`
    );

    writeStream.write("using System;\n");

    writeStream.write("using Microsoft.EntityFrameworkCore;\n\n");
    modelNames.forEach((model) => {
      writeStream.write(`using ${model}Entity;\n`);
    });
    writeStream.write("\n");
    writeStream.write("namespace Data;\n\n");
    writeStream.write(
      "public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)\n"
    );
    writeStream.write("{\n");
    modelNames.forEach((model) => {
      writeStream.write(`    public DbSet<${model}> ${model} { get; set; }\n`);
    });
    writeStream.write("\n");
    writeStream.write(
      "    protected override void OnModelCreating(ModelBuilder modelBuilder)\n"
    );
    writeStream.write(`    {\n\n`);
    writeStream.write(`    }\n`);
    writeStream.write("}");

    writeStream.end();
  } catch (error) {
    console.error(`Error in createService: ${error}`);
    throw error;
  }
}

async function createProgramFile(modelNames) {
  try {
    const writeStream = fs.createWriteStream(`${PATH_BASE}/Program.cs`);

    writeStream.write(`using Microsoft.EntityFrameworkCore;\n`);
    modelNames.forEach((model) => {
      writeStream.write(`using ${model}Entity;\n`);
    });
    writeStream.write(`\n`);

    writeStream.write(`var builder = WebApplication.CreateBuilder(args);\n\n`);
    writeStream.write(`builder.Services.AddEndpointsApiExplorer();\n`);
    writeStream.write(`builder.Services.AddSwaggerGen();\n`);
    writeStream.write(`builder.Services.AddControllers();\n\n`);

    modelNames.forEach((model) => {
      writeStream.write(`builder.Services.AddScoped<${model}Repository>();\n`);
    });
    writeStream.write(`\n`);

    modelNames.forEach((model) => {
      writeStream.write(
        `builder.Services.AddScoped<I${model}Service, ${model}Service>();\n`
      );
    });
    writeStream.write(`\n`);

    writeStream.write(
      `builder.Services.AddDbContext<Data.AppDbContext>(options =>\n`
    );
    writeStream.write(`{\n`);
    writeStream.write(
      `    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");\n`
    );
    writeStream.write(`    options.UseNpgsql(connectionString);\n`);
    writeStream.write(`});\n\n`);

    writeStream.write(`var app = builder.Build();\n\n`);

    writeStream.write(`if (app.Environment.IsDevelopment())\n`);
    writeStream.write(`{\n`);
    writeStream.write(`    app.UseSwagger();\n`);
    writeStream.write(`    app.UseSwaggerUI();\n`);
    writeStream.write(`}\n\n`);

    writeStream.write(`app.UseHttpsRedirection();\n`);
    writeStream.write(`app.UseAuthorization();\n`);
    writeStream.write(`app.MapControllers();\n\n`);

    writeStream.write(`app.Run();`);

    writeStream.end();
  } catch (error) {
    console.error(`Error in createProgramFile: ${error}`);
    throw error;
  }
}

module.exports = generateFiles;
