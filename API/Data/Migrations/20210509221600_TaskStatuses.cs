using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class TaskStatuses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskStatuses",
                columns: table => new
                {
                    TaskStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskStatusName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskStatuses", x => x.TaskStatusID);
                });

            migrationBuilder.InsertData(
                table: "TaskStatuses",
                columns: new[] { "TaskStatusID", "TaskStatusName" },
                values: new object[,]
                {
                    { 1, "In Progress" },
                    { 2, "Ready for QA" },
                    { 3, "Assigned" },
                    { 4, "Finished" },
                    { 5, "Code Review" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskStatuses");
        }
    }
}
