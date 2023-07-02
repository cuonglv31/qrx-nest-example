import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";
import * as https from "https";

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
    try {
      const dataPath = path.join(process.cwd(), 'src', 'data', 'index.json');
      const data: string = fs.readFileSync(dataPath, 'utf-8');
      const qrcodeList: Array<IQRCode> = JSON.parse(data)?.qrcode || [];

      const qrCode = qrcodeList.find((q) => q.id === qrId);
      if (!qrCode) {
        return res.redirect('/');
      }

      // const response = await fetch(qrCode.url, {
      //   method: 'HEAD',
      // });
      //
      // if (!response.ok) {
      //   return res.redirect('/');
      // }

      return res.redirect(qrCode.url);
    } catch (error) {
      console.log('ERROR', error);
      return res.redirect('/');
    }
  }

  @Get('/')
  @Render('index')
  pageError() {
    return { message: 'Page not found' };
  }
}
