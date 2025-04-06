import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Teacher } from "@prisma/client";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(user: Teacher) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: "Email tasdiqlash",
        template: "./confirm", // templates/confirm.hbs bo‘lishi kerak
        context: {
          name: user.first_name,
          url: `http://localhost:7777/teacher/activate/${user.verification}`,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Xat yuborishda xatolik');
    }
  }
}
