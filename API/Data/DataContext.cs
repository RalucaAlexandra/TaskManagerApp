using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, 
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Message> Messages { get; set; }
         public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }
         public DbSet<Project> Projects { get; set; }
        public DbSet<TaskPriority> TaskPriorities { get; set; }
         public DbSet<TaskStatus> TaskStatuses { get; set; }
         public DbSet<Task> Tasks { get; set; }
         public DbSet<TaskStatusDetail> TaskStatusDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Project>().HasData(
                new Project() { ProjectID = 1, ProjectName = "Project1", DateOfStart = Convert.ToDateTime("10-04-2020"), TeamSize = 10 }, 
                new Project() { ProjectID = 2, ProjectName = "Project2", DateOfStart = Convert.ToDateTime("10-04-2020"), TeamSize = 10 }, 
                new Project() { ProjectID = 3, ProjectName = "Project3", DateOfStart = Convert.ToDateTime("10-04-2020"), TeamSize = 10 }, 
                new Project() { ProjectID = 4, ProjectName = "Project4", DateOfStart = Convert.ToDateTime("10-04-2020"), TeamSize = 10 }, 
                new Project() { ProjectID = 5, ProjectName = "Project5", DateOfStart = Convert.ToDateTime("10-04-2020"), TeamSize = 10 } 
             );
            
            builder.Entity<TaskPriority>().HasData(
                new TaskPriority() {TaskPriorityID = 1, TaskPriorityName = "Urgent"},
                new TaskPriority() {TaskPriorityID = 2, TaskPriorityName = "High"},
                new TaskPriority() {TaskPriorityID = 3, TaskPriorityName = "Normal"},
                new TaskPriority() {TaskPriorityID = 4, TaskPriorityName = "Low"}
            );

             builder.Entity<TaskStatus>().HasData(
                new TaskStatus() { TaskStatusID = 1, TaskStatusName = "In Progress" }, 
                new TaskStatus() { TaskStatusID = 2, TaskStatusName = "Ready for QA" }, 
                new TaskStatus() { TaskStatusID = 3, TaskStatusName = "Assigned" }, 
                new TaskStatus() { TaskStatusID = 4, TaskStatusName = "Finished" }, 
                new TaskStatus() { TaskStatusID = 5, TaskStatusName = "Code Review" } 
             );


            builder.ApplyUtcDateTimeConverter();
        }
    }
            public static class UtcDateAnnotation
        {
        private const String IsUtcAnnotation = "IsUtc";
        private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
            new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
            new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

        public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
            builder.HasAnnotation(IsUtcAnnotation, isUtc);

        public static Boolean IsUtc(this IMutableProperty property) =>
            ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

        /// <summary>
        /// Make sure this is called after configuring all your entities.
        /// </summary>
        public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
        {
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
            foreach (var property in entityType.GetProperties())
            {
                if (!property.IsUtc())
                {
                continue;
                }

                if (property.ClrType == typeof(DateTime))
                {
                property.SetValueConverter(UtcConverter);
                }

                if (property.ClrType == typeof(DateTime?))
                {
                property.SetValueConverter(UtcNullableConverter);
                }
            }
            }
        }
        }
}