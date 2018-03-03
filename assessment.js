(function () {
    'usestrict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子供を全て削除する
     * @param {HTMLElement} element HTMLの要素
     */

    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { //名前がからの時は処理を終了する。ガード区という。
            return;
        }

        // 診断結果表示エリアの作成、ボタンが押されてから表示されるように。
        removeAllChildren(resultDivided);     //同じ結果が表示されないように。
        // whileはループの一種で、（）内が真である限り{}する。
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);
        
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
    
    /*
    //TODO ツイートエリアの作成  ⬇元のURL
    <a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ診断&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="hoge" data-lang="ja" data-show-count="false">Tweet #あなたのいいところ診断</a> 
    httpsはスキーム、twitter.comはホスト名、/intext/tweetはリソース名、?から後ろはクエリ、という
    */
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?=button_hashtag'
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = '#あなたのいいところ をツイートする';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();
};

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {       //13番はエンターキー
            removeAllChildren(resultDivided);
            assessmentButton.onclick();
        }
    };

    
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化され、前向きになれます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];

    /**
     *  名前の文字列を渡すと診断結果を返す関数 ⇦メモを残すと、丁寧なコードになる（jsDocという）
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の配列の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        
        result = result.replace(/\{userName\}/g, userName); //正規表現。gをつけることで全ての{userName}が書き換えられる
        // TODO 診断処理を実装する
        return result;
    }
    
    // 正しく動作しているかテストする
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '失敗してるよ'
    )
})();
