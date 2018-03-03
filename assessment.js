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

    // 診断結果表示エリアの作成、ボタンが押されてから表示されるように。
    removeAllChildren(resultDivided);     //同じ結果が表示されないように。

    assessmentButton.onclick = function () {
        const userName = userNameInput.value;
        if (userName.length === 0) { //名前がからの時は処理を終了する。ガード区という。
            return;
        }

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
        '{userName}さんのいいところは声です。{userName}さんの特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}さんのいいところはまなざしです。{userName}さんに見つめられた人は、気になって仕方がないでしょう。',
        '{userName}さんのいいところは情熱です。{userName}さんの情熱に周りの人は感化され、前向きになれます。',
        '{userName}さんのいいところは厳しさです。{userName}さんの厳しさがものごとをいつも成功に導きます。',
        '{userName}さんのいいところは知識です。博識な{userName}さんを多くの人が頼りにしています。',
        '{userName}さんのいいところはユニークさです。{userName}さんだけのその特徴が皆を楽しくさせます。',
        '{userName}さんのいいところは用心深さです。{userName}さんの洞察に、多くの人が助けられます。',
        '{userName}さんのいいところは見た目です。内側から溢れ出る{userName}さんの良さに皆が気を惹かれます。',
        '{userName}さんのいいところは決断力です。{userName}さんがする決断にいつも助けられる人がいます。',
        '{userName}さんのいいところは思いやりです。{userName}さんに気をかけてもらった多くの人が感謝しています。',
        '{userName}さんのいいところは感受性です。{userName}さんが感じたことに皆が共感し、わかりあうことができます。',
        '{userName}さんのいいところは節度です。強引すぎない{userName}さんの考えに皆が感謝しています。',
        '{userName}さんのいいところは好奇心です。新しいことに向かっていく{userName}さんの心構えが多くの人に魅力的に映ります。',
        '{userName}さんのいいところは気配りです。{userName}さんの配慮が多くの人を救っています。',
        '{userName}さんのいいところはその全てです。ありのままの{userName}さん自身がいいところなのです。',
        '{userName}さんのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}さんが皆から評価されています。'
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
