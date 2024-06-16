-- CreateTable
CREATE TABLE "area" (
    "area_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "action_id" INTEGER NOT NULL,
    "reaction_id" INTEGER NOT NULL,
    "created_at" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "area_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "event" (
    "event_id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "endpoint" VARCHAR(255) NOT NULL,
    "created_at" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "service" (
    "service_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "created_at" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_service" (
    "user_service_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "config" JSON,
    "created_at" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "user_service_pkey" PRIMARY KEY ("user_service_id")
);

-- CreateTable
CREATE TABLE "area_event" (
    "area_event_id" SERIAL NOT NULL,
    "area_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "endpoint_details" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "created_at" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "area_event_pkey" PRIMARY KEY ("area_event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "area_event"("area_event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_reaction_id_fkey" FOREIGN KEY ("reaction_id") REFERENCES "area_event"("area_event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("service_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_service" ADD CONSTRAINT "user_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("service_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_service" ADD CONSTRAINT "user_service_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "area_event" ADD CONSTRAINT "area_event_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("area_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "area_event" ADD CONSTRAINT "area_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION;

