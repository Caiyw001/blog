const axios = require('axios');
const fs = require('fs');
const cheerio=require('cheerio');

module.exports = spider;

async function spider(year, juniorcollege) {
    for (let loopnum = 1; loopnum <= 1000; loopnum++) {
        let schools = [];

        let url = 'http://www.sxzd360.com/index.php/score/searchbyschoolscorewc/' + loopnum;
        let params = {
            tdfmc: '',
            year: year,
            juniorcollege: juniorcollege,
            batch: -1
        }
        let headers = {
            cookie: 'Hm_lvt_d2e5e5fb68943080cf801f1a9f1a6261=1557970704,1558064715,1558076085,1558314464; ssocode=155833243967158; ci_session=7fe9bf9bd511a10e7e6e3a00f7b8b3613355512f; Hm_lpvt_d2e5e5fb68943080cf801f1a9f1a6261=1558334055'
        }

        let result = await axios.get(url, {
            params: params,
            headers: headers
        })

        let cheerload = cheerio.load(result.data);
        let trArr = cheerload('tbody tr');
        if(trArr.length==0){
            break;
        }

        for (let i = 0; i < trArr.length; i++) {
            let tds = trArr.eq(i).find('td');
            let school = {
                '院校名称': tds.eq(0).text().split('\n')[0],
                '院校投档分': tds.eq(1).text(),
                '投档分位次': tds.eq(2).text(),
                '投档分超分': tds.eq(3).text(),
                '文理科': tds.eq(4).text(),
                '批次': tds.eq(5).text(),
                '省份': tds.eq(6).text(),
                '城市': tds.eq(7).text(),
                '学校属性': tds.eq(0).find('a').text()
            };
            schools.push(school);
        }

        await new Promise((resolve,reejct)=>{
            fs.writeFile(`./datas/理科/${year}_${juniorcollege}.json`, JSON.stringify(schools)+loopnum,{flag:'a'}, function (err) {
                if (!err) {
                    resolve();
                }
            });
        }); 

        console.log(loopnum);
    }
}
