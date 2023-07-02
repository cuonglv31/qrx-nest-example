import {Controller, Get, Query, Render, Res} from '@nestjs/common';

type IQRCode = {
  id: string;
  url: string;
};

@Controller()
export class AppController {
  @Get('v/s')
  async getRedirectQRCode(@Res() res, @Query() query: { id: string }) {
    const qrId = query?.id?.trim() || '';
    if (!qrId) {
      return res.redirect('/');
    }

    const qrcodeList: Array<IQRCode> = [
      {
        id: 'ITLAs0i4zdT7bpaXudW9',
        url: 'https://donghetop.vn',
      },
      {
        id: 'VO1iuLOCIjRHYvnHoD31',
        url: 'http://emax.medent.vn',
      },
      {
        id: 'KNUQE3cjOG5EtoNyAEhm',
        url: 'https://bostonpharma.com.vn/vn/kim-tien-thao.html',
      },
    ];

    const qrCode = qrcodeList.find((q) => q.id === qrId);
    if (!qrCode) {
      return res.redirect('/');
    }

    const response = await fetch(qrCode.url, {
      method: 'HEAD',
    });

    if (!response.ok) {
      return res.redirect('/');
    }

    return res.redirect(qrCode.url);
  }

  @Get('/')
  @Render('index')
  pageError() {
    return { message: 'Page not found' };
  }
}
