const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

//河北文科
const wl = {
  '文科': 1,
  '理科': 2
}

const provinces = {
  '河北': 5,
  '山东': 16
}

const years = [2015, 2016, 2017, 2018];
const url = 'http://www.gaokaoq.com/score/index.html?type=#type&city=5&collegeCity=#collegeCity&year=#year&q=';

var dicProvinceAndUrl = [];

main();

/**
 *主函数
 *
 */
async function main() {
  //await readFile();
  for (let i = 0; i < years.length; i++) {
    dicProvinceAndUrl.push(
      {
        province: '山东',
        url: url.replace('#type', wl.理科).replace('#collegeCity', provinces.山东).replace('#year', years[i])
      }
    )
  }


  for (let index = 0; index < dicProvinceAndUrl.length; index++) {
    let url = dicProvinceAndUrl[index].url;
    let province = dicProvinceAndUrl[index].province;
    console.log(province);
    await getData(url, province);
  }
  console.log('success!');
}


/**
 * 读取文件数据
 */
async function getUrl() {
  let fileContent = await fs.readFileSync(path.join(__dirname, 'source.html'));
  let htmlContent = fileContent.toString();
  let htmlDom = cheerio.load(htmlContent);
  let aList = htmlDom('a');

  for (let i = 0; i < aList.length; i++) {
    dicProvinceAndUrl.push(
      {
        province: aList.eq(i).text(),
        url: `http://www.gaokaoq.com${aList.eq(i).attr('href')}`
      }
    )
  }
  await fs.writeFileSync(path.join(__dirname, 'url.json'), JSON.stringify(dicProvinceAndUrl));
}

/**
 *读取URL
 *
 */
async function readFile() {
  let fileContent = await fs.readFileSync(path.join(__dirname, 'url.json'));
  dicProvinceAndUrl = JSON.parse(fileContent.toString());
}


async function getData(url, province) {
  await fs.writeFile(path.join(__dirname, 'datas.json'), province, { flag: 'a' });
  top:
  for (let index = 1; index <= 21; index++) {
    // 1、拼接请求参数
    // cookie
    let headers = {
      Cookie: 'PHPSESSID=22p7qs0r2r0easch8lh3j4u0p3; Hm_lvt_fd9bf00761167d2e9689ba3d37779881=1560131313; w_upp=d6a9ft11uABrwsPA8tOuSTJYLVidQ5rchGRHFRUq50osF86QD5AZUA-277cosfLrzPp8GpZIrO6gd1JFhmRjIyfkKzir9E75U3kX81ZOycE7g8-7ff16ulSzqb5TxNFe5P5pX%2FQe%2BL1ji65KPOvkzQ; w_redirect_url=http%3A%2F%2Fwww.gaokaoq.com%2Fscore%2Findex.html%3Ftype%3D2%26city%3D5%26collegeCity%3D1%26year%3D0%26q%3D; Hm_lpvt_fd9bf00761167d2e9689ba3d37779881=1560135446; SERVERID=f84eeff41cbb9c1c4e816aebe24ae96f|1560135451|1560131308'
    }

    let rlt = await axios({
      url: `${url}&p=${index}`,
      type: 'get',
      headers: headers
    })

    let $ = cheerio.load(rlt.data);
    let tableDom = $('table').eq(1);
    let trs = tableDom.find('tr');
    if (trs.eq(1).text().indexOf('未找到符合条件的数据') > -1) {
      break top;
    }

    if (index == 21) {
      await fs.writeFileSync(path.join(__dirname, 'max.json'), province, { flag: 'a' });
      break top;
    }

    let datas = [];
    for (let i = 1; i < trs.length; i++) {
      let tds = trs.eq(i).find('td');
      let fsline = {
        '院校名称': tds.eq(0).text(),
        '招生类型': tds.eq(1).text().replace(/\s*/g, ""),
        '科类': tds.eq(2).text(),
        '年份': tds.eq(3).text(),
        '批次': tds.eq(4).text(),
        '最高分': tds.eq(5).text(),
        '最低分': tds.eq(6).text(),
        '最低分位次': tds.eq(7).text(),
        'index': index
      }
      datas.push(fsline);
    }
    await fs.writeFile(path.join(__dirname, 'datas_理科.json'), JSON.stringify(datas), { flag: 'a' }, function (err) {
      if (err) {
        console.log(err);
      }
    });
    console.log(index);
  }
}