using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CollegeEventRegistration.Migrations
{
    public partial class AddUsersAndUpdateRegistrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentName",
                table: "Registrations");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Registrations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Registrations");

            migrationBuilder.AddColumn<string>(
                name: "StudentName",
                table: "Registrations",
                type: "TEXT",
                nullable: true);
        }
    }
}
