const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

spider(2015, '专科', -1);

/**
 * 获取历年专业录取信息
 * @param {Number} year 
 * @param {String} juniorcollege 
 * @param {Number} batch 
 */
async function spider(year, juniorcollege, batch) {
    let params = {
        year: year,
        juniorcollege: juniorcollege,
        batch: batch,
        professionname: ''
    }

    let headers = {
        cookie: 'Hm_lvt_d2e5e5fb68943080cf801f1a9f1a6261=1558064715,1558076085,1558314464,1558338754; ssocode=155833877387699; ci_session=3ca03cbaa08e394067b48b284fbce5179cbd6716; Hm_lpvt_d2e5e5fb68943080cf801f1a9f1a6261=1558342208'
    }

    for (let index = 1; index <= 1000; index++) {
        let majors = [];
        let url = 'http://www.sxzd360.com/index.php/score/searchbyprofessional/' + index;
        let result = await axios.get(url, {
            params: params,
            headers: headers
        }).catch(err=>{
            console.log(err);
        })

        let html = result.data;
        let cheerLoad = cheerio.load(html);
        let tbody = cheerLoad('tbody').eq(0);

        if (tbody.text().trim().length == 0) {
            break;
        }

        let trs = tbody.find('tr');
        for (let i = 0; i <= trs.length; i++) {
            let tds = trs.eq(i).find('td');
            majors.push({
                '院校名称': tds.eq(0).text().split('\n')[0],
                '专业名称': tds.eq(1).find('a').eq(0).text(),
                '专业最低分': tds.eq(2).text(),
                '最低分位次': tds.eq(3).text(),
                '平均分': tds.eq(4).text(),
                '平均分位次': tds.eq(5).text(),
                '专业门槛分': tds.eq(6).text(),
                '专业录取人数': tds.eq(7).text(),
                '文理科': tds.eq(8).text(),
                '批次': tds.eq(9).text(),
                '学校性质': tds.eq(0).find('a').eq(0).text()
            })
        }

        await new Promise(function (resolve, reject) {
            fs.writeFile(`./datas/理科/${year}_${juniorcollege}.json`, JSON.stringify(majors)+index,{flag:'a'}, function (err) {
                resolve();
            })
        })
        console.log(index);
    }
}