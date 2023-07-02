import {Controller, Get, Query, Render, Res} from '@nestjs/common';

@Controller()
export class AppController {
  @Get('v/s')
  async getRedirectQRCode(@Res() res, @Query() query: { id: string }) {
    const qrcodeId = query.id || '';
    if (!qrcodeId) {
      return res.redirect('/');
    }

    const response = await fetch('https://google.com', {
      method: 'HEAD',
    });

    if (response.ok) {
      console.log(response.ok);
      return res.redirect('https://chat.zalo.me');
    }

    return res.redirect('/');
  }

  @Get('/')
  @Render('index')
  pageError() {
    return { message: 'Page not found' };
  }
}
