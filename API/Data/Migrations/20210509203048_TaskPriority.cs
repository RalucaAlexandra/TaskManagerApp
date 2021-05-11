using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class TaskPriority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskPriorities",
                columns: table => new
                {
                    TaskPriorityID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskPriorityName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskPriorities", x => x.TaskPriorityID);
                });

            migrationBuilder.InsertData(
                table: "TaskPriorities",
                columns: new[] { "TaskPriorityID", "TaskPriorityName" },
                values: new object[,]
                {
                    { 1, "Urgent" },
                    { 2, "High" },
                    { 3, "Normal" },
                    { 4, "Low" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskPriorities");
        }
    }
}
