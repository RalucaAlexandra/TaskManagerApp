using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class ProjectAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TeamSize = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ProjectID);
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "ProjectID", "DateOfStart", "ProjectName", "TeamSize" },
                values: new object[,]
                {
                    { 1, new DateTime(2020, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Project1", 10 },
                    { 2, new DateTime(2020, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Project2", 10 },
                    { 3, new DateTime(2020, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Project3", 10 },
                    { 4, new DateTime(2020, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Project4", 10 },
                    { 5, new DateTime(2020, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Project5", 10 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
