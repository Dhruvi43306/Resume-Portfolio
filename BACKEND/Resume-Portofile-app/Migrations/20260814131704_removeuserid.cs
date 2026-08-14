using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Resume_Portofile_app.Migrations
{
    /// <inheritdoc />
    public partial class removeuserid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_UsersUserId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_UsersUserId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "UsersUserId",
                table: "Messages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsersUserId",
                table: "Messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UsersUserId",
                table: "Messages",
                column: "UsersUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_UsersUserId",
                table: "Messages",
                column: "UsersUserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
