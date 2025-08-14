ALTER TABLE "courses" DROP CONSTRAINT "courses_name_unique";--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_title_unique" UNIQUE("title");