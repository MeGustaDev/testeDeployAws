import { Controller, Get, Post, Header, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('search')
  async searchArtist(@Query('artist') artist:string): Promise<any> {
    const accessToken = "BQAInlF_MwPpbmn09cKsjPHSoG2sC_0ZVVaUTD3rB-aOB_BpWWvGsN2_a0-Wf4EHcG9af96-mTKZLZ8CwXmKYnNMeNXxPvSz4FqE9bvDcbOeAK58vqQH"; //por enquanto deixar o accessToken hardcoded
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      let response = await fetch(`https://api.spotify.com/v1/search?q=artist%3A${artist}&type=artist&limit=1`, options);
      let resJsonData = await response.json();

      let artistId = resJsonData["artists"].items[0].id;
      let artistName = resJsonData["artists"].items[0].name;
      let genres = resJsonData["artists"].items[0].genres;

      console.log(artistId);
      console.log(artistName);
      console.log(genres);

      return resJsonData;

    } catch(e){
      console.log(e);
    }
  }

  @Get(':artistId')
  async getArtistTopTracks(@Param('artistId') artistId: string ): Promise<any> {

    const accessToken = "BQAInlF_MwPpbmn09cKsjPHSoG2sC_0ZVVaUTD3rB-aOB_BpWWvGsN2_a0-Wf4EHcG9af96-mTKZLZ8CwXmKYnNMeNXxPvSz4FqE9bvDcbOeAK58vqQH"; //por enquanto deixar o accessToken hardcoded
    
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      let response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`, options);
      let resJsonData = await response.json();

      let i: number;

      let trackNamesArr = [];
      for(i=0; i<10; i++){
        trackNamesArr.push(resJsonData.tracks[i].name);
      }

      console.log(trackNamesArr)

      return resJsonData;

    } catch(e){
      console.log(e);
    }

  }
}
