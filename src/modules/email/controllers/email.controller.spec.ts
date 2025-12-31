import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from '../services/email.service';
import { SendEmailDto } from '../dto/send-email.dto';

describe('EmailController', () => {
  let controller: EmailController;
  let service: EmailService;

  const mockEmailService = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /api/sendEmail', () => {
    it('should send email successfully', async () => {
      // Arrange
      const emailData: SendEmailDto = {
        name: 'João Silva',
        email: 'joao.silva@gmail.com',
        cellphone: '(11) 99999-9999',
        subject: 'Contato via Site',
        message: 'Olá! Gostaria de saber mais sobre os serviços.',
      };

      mockEmailService.sendEmail.mockResolvedValue(undefined);

      // Act
      const result = await controller.sendEmail(emailData);

      // Assert
      expect(service.sendEmail).toHaveBeenCalledWith(emailData);
      expect(result.message).toBe('Email sent successfully');
      expect(result.success).toBe(true);
      expect(result.timestamp).toBeInstanceOf(Date);
    });
  });
});
