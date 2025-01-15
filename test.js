const fs = require('fs');
const path = require('path');
const https = require('https');

// 이미지를 저장할 디렉토리
const ASSETS_DIR = './assets/items';

// 아이템 아이콘 정보
const ItemIcon = {
  '파괴석 조각': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_250.png',
  파괴석: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_15.png',
  '파괴석 결정': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_105.png',
  파괴강석: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_10_58.png',
  '정제된 파괴강석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_15.png',
  '운명의 파괴석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_88.png',
  '수호석 조각': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_251.png',
  수호석: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_16.png',
  '수호석 결정': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_104.png',
  수호강석: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_10_59.png',
  '정제된 수호강석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_16.png',
  '운명의 수호석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_89.png',
  '조화의 돌파석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_10_25.png',
  '명예의 돌파석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_155.png',
  '위대한 명예의 돌파석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_156.png',
  '경이로운 명예의 돌파석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_157.png',
  '찬란한 명예의 돌파석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_17.png',
  '운명의 돌파석': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_85.png',
  '오레하 융화 재료': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_71.png',
  '상급 오레하 융화 재료': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_109.png',
  '최상급 오레하 융화 재료':
    'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_29.png',
  '아비도스 융화 재료': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_86.png',
  '조화의 파편 주머니(소)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_231.png',
  '명예의 파편 주머니(소)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_225.png',
  '운명의 파편 주머니(소)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_91.png',
  '조화의 파편 주머니(중)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_232.png',
  '명예의 파편 주머니(중)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_226.png',
  '조화의 파편 주머니(대)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_233.png',
  '명예의 파편 주머니(대)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_227.png',
  '운명의 파편 주머니(중)': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_92.png',
  '별의 숨결': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_169.png',
  '태양의 은총': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_161.png',
  '태양의 축복': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_162.png',
  '태양의 가호': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_163.png',
  '용암의 숨결': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_171.png',
  '빙하의 숨결': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_172.png',
  '재봉술 : 비늘 [5-7]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_226.png',
  '재봉술 : 선혈 [8-10]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_226.png',
  '재봉술 : 마수 [11-15]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_226.png',
  '재봉술 : 몽환 [13-15]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_70.png',
  '재봉술 : 몽환 [16-19]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_70.png',
  '재봉술 : 쇠락 [13-15]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_70.png',
  '재봉술 : 쇠락 [16-19]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_70.png',
  '재봉술 : 업화 [11-14]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_219.png',
  '야금술 : 비늘 [5-7]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_222.png',
  '야금술 : 선혈 [8-10]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_222.png',
  '야금술 : 마수 [11-15]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_222.png',
  '야금술 : 몽환 [13-15]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_69.png',
  '야금술 : 몽환 [16-19]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_69.png',
  '야금술 : 쇠락 [13-15]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_69.png',
  '야금술 : 쇠락 [16-19]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_69.png',
  '야금술 : 업화 [11-14]': 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_218.png',
};

// 디렉토리가 없으면 생성
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// 파일 이름으로 사용할 수 없는 문자 제거
const sanitizeFileName = (fileName) => {
  return fileName.replace(/[/\\?%*:|"<>]/g, '-');
};

// 이미지 다운로드 함수
const downloadImage = (url, fileName) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${fileName}: ${response.statusCode}`));
          return;
        }

        const data = [];
        response.on('data', (chunk) => {
          data.push(chunk);
        });

        response.on('end', () => {
          const buffer = Buffer.concat(data);
          const sanitizedFileName = sanitizeFileName(fileName);
          const filePath = path.join(ASSETS_DIR, `${sanitizedFileName}.png`);

          fs.writeFileSync(filePath, buffer);
          console.log(`Downloaded: ${fileName}`);
          resolve();
        });
      })
      .on('error', (err) => {
        reject(new Error(`Error downloading ${fileName}: ${err.message}`));
      });
  });
};

// 딜레이 함수
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 모든 이미지 다운로드
const downloadAllImages = async () => {
  console.log('Starting downloads...');

  // 동시 다운로드를 제한하기 위한 배치 처리
  const batchSize = 3; // 한 번에 3개씩 다운로드
  const items = Object.entries(ItemIcon);

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    // 각 배치 다운로드
    await Promise.all(batch.map(([name, url]) => downloadImage(url, name)));

    // 서버 부하를 줄이기 위해 배치 사이에 딜레이 추가
    if (i + batchSize < items.length) {
      await delay(1000); // 1초 대기
    }
  }

  console.log('All downloads completed!');

  // 이미지 경로를 가진 새로운 객체 생성
  const assetPaths = {};
  for (const name of Object.keys(ItemIcon)) {
    const sanitizedName = sanitizeFileName(name);
    assetPaths[name] = `/assets/items/${sanitizedName}.png`;
  }

  // assets 경로 매핑 파일 생성
  const assetMapping = `export const ItemAssets = ${JSON.stringify(assetPaths, null, 2)};`;
  fs.writeFileSync('./src/constants/itemAssets.ts', assetMapping);
  console.log('Asset mapping file created!');
};

// 스크립트 실행
downloadAllImages().catch(console.error);
