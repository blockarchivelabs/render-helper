/* eslint-disable */

import {expect} from 'chai';
import setup from './setup';
import {getTestData} from './data';
import markdown2Html from '../src/markdown-2-html';

const fs = require('fs');
const path = require('path');

setup();

describe('Markdown2Html', () => {

  describe('Traversing', () => {

    it('1- Should convert image links to img tag', () => {
      const input = {
        author: 'foo11',
        permlink: 'bar11',
        last_update: '2019-05-10T09:15:21',
        body: "https://img.esteem.ws/bbq3ob1idy.png"
      };
      const expected = '<p><img class="markdown-img-link" src="https://images.ecency.com/p/o1AJ9qDyyJNSpZWhUgGYc3MngFqoAMwgbeMkkd8SVxyfRVjiN?format=match&amp;mode=fit" /></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('2- Should handle steemit links', () => {
      const input = {
        author: 'foo22',
        permlink: 'bar22',
        last_update: '2019-05-10T09:15:21',
        body: "<a href='https://steemit.com/esteem/@esteemapp/esteem-monthly-guest-curation-program-4'>click here</a>"
      };
      const expected = '<p><a class="markdown-post-link" data-tag="esteem" data-author="esteemapp" data-permlink="esteem-monthly-guest-curation-program-4">click here</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('3- Should handle copied links', () => {
      const input = {
        author: 'foo33',
        permlink: 'bar33',
        last_update: '2019-05-10T09:15:21',
        body: "<a href='/esteem/@esteemapp/esteem-monthly-guest-curation-program-4'>click here</a>"
      };
      const expected = '<p><a class="markdown-post-link" data-tag="esteem" data-author="esteemapp" data-permlink="esteem-monthly-guest-curation-program-4">click here</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('4- Should handle copied links', () => {
      const input = {
        author: 'foo34',
        permlink: 'bar34',
        last_update: '2019-05-10T09:15:21',
        body: "[click here](/esteem/@esteemapp/esteem-monthly-guest-curation-program-4)"
      };
      const expected = '<p><a class="markdown-post-link" data-tag="esteem" data-author="esteemapp" data-permlink="esteem-monthly-guest-curation-program-4">click here</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('5- Should handle youtube videos', () => {
      const input = {
        author: 'foo35',
        permlink: 'bar35',
        last_update: '2019-05-10T09:15:21',
        body: "https://www.youtube.com/watch?v=qK3d1eoH-Qs"
      };
      const expected = '<p><a class="markdown-video-link markdown-video-link-youtube" data-embed-src="https://www.youtube.com/embed/qK3d1eoH-Qs?autoplay=1"><img class="no-replace video-thumbnail" src="https://images.ecency.com/p/S5Eokt4BcQdk7EHeT1aYjzebg2hC7hkthT45eMZRVYW6mkGBWKemLWWzXbRhNG7Z3h1qjGS?format=match&amp;mode=fit" /><span class="markdown-video-play"></span></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('6- Should handle vimeo videos', () => {
      const input = {
        author: 'foo36',
        permlink: 'bar36',
        last_update: '2019-05-10T09:15:21',
        body: "https://vimeo.com/311983548"
      };
      const expected = '<p><a class="markdown-video-link markdown-video-link-vimeo"><iframe frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/311983548"></iframe></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('7- Should handle d.tube videos', () => {
      const input = {
        author: 'foo37',
        permlink: 'bar37',
        last_update: '2019-05-10T09:15:21',
        body: '<a href="https://d.tube/#!/v/scottcbusiness/g04n2bbp" title="This link will take you away from steemit.com"><img src="https://images.ecency.com/640x0/https://ipfs.io/ipfs/QmPhb9HA1gASFiNAUPFqMdSidTAj17L5SSoV3zbXUx8M7t"></a>'
      };
      const expected = '<p><a title="This link will take you away from steemit.com" class="markdown-video-link markdown-video-link-dtube" data-embed-src="https://emb.d.tube/#!/scottcbusiness/g04n2bbp"><img class="no-replace video-thumbnail" src="https://images.ecency.com/p/46aP2QbqUqBqwzwxM6L1P6uLNceBDDCM6xyDJFx6ANhENRd3gJWJH7TiVR91QZ1KBcdAdZruQE35PBpQ3jUvkNK4mJqZ?format=match&amp;mode=fit" /><span class="markdown-video-play"></span></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('9- Should handle witnesses links', () => {
      const input = {
        author: 'foo39',
        permlink: 'bar39',
        last_update: '2019-05-10T09:15:21',
        body: "<a href='https://hivesigner.com/sign/account-witness-vote?witness=talhasch'>vote @talhasch</a>"
      };
      const expected = '<p><a class="markdown-witnesses-link" data-href="https://hivesigner.com/sign/account-witness-vote?witness=talhasch">vote @talhasch</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('10- External link', () => {
      const input = {
        author: 'foo40',
        permlink: 'bar40',
        last_update: '2019-05-10T09:15:21',
        body: "click <a href='https://loremipsum.com/foo/bar.html'>here</a> to visit"
      };
      const expected = '<p>click <a class="markdown-external-link" data-href="https://loremipsum.com/foo/bar.html">here</a> to visit</p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('11- Should remove empty iframes', () => {
      const input = {
        author: 'foo41',
        permlink: 'bar41',
        last_update: '2019-05-10T09:15:21',
        body: "<iframe></iframe> <code>some content</code>"
      };
      const expected = '<code>some content</code>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('12- Should handle youtube iframe embeds', () => {
      const input = {
        author: 'foo42',
        permlink: 'bar42',
        last_update: '2019-05-10T09:15:21',
        body: '<iframe width="560" height="315" src="https://www.youtube.com/embed/I3f9ixg59no?foo=bar&baz=000" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      };
      const expected = '<iframe src="https://www.youtube.com/embed/I3f9ixg59no" frameborder="0" allowfullscreen="allowfullscreen"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('13- Should handle vimeo iframe embeds', () => {
      const input = {
        author: 'foo43',
        permlink: 'bar43',
        last_update: '2019-05-10T09:15:21',
        body: '<iframe src="https://player.vimeo.com/video/311983548" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
      };
      const expected = '<iframe src="https://player.vimeo.com/video/311983548" frameborder="0" allowfullscreen="allowfullscreen"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('14- Should handle twitch iframe embeds', () => {
      const input = {
        author: 'foo44',
        permlink: 'bar44',
        last_update: '2019-05-10T09:15:21',
        body: '<iframe src="https://player.twitch.tv/?channel=esl_csgo" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>'
      };
      const expected = '<iframe src="https://player.twitch.tv/?channel=esl_csgo&amp;parent=ecency.com&amp;autoplay=false" frameborder="0" allowfullscreen="true"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('15- Should handle soundcloud iframe embeds', () => {
      const input = {
        author: 'foo45',
        permlink: 'bar45',
        last_update: '2019-05-10T09:15:21',
        body: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/558749283&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      };
      const expected = '<iframe frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/558749283&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('16- Should replace placeholder for unsopported iframe sources', () => {
      const input = {
        author: 'foo46',
        permlink: 'bar46',
        last_update: '2019-05-10T09:15:21',
        body: '<iframe src="https://foobarbaz.com/132431212" ></iframe>'
      };
      const expected = '<div class="unsupported-iframe">(Unsupported https://foobarbaz.com/132431212)</div>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('17- Should replace author names with link for given string', () => {
      let input = {
        author: 'foo47',
        permlink: 'bar47',
        last_update: '2019-05-10T09:15:21',
        body: 'lorem ipsum @dolor sit amet'
      };
      let expected =
        '<p><span>lorem ipsum <a class="markdown-author-link" data-author="dolor">@dolor</a> sit amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo48',
        permlink: 'bar48',
        last_update: '2019-05-10T09:15:21',
        body: '@lorem ipsum @dolor sit amet'
      };
      expected =
        '<p><span><a class="markdown-author-link" data-author="lorem">@lorem</a> ipsum <a class="markdown-author-link" data-author="dolor">@dolor</a> sit amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);


      input = {
        author: 'foo49',
        permlink: 'bar49',
        last_update: '2019-05-10T09:15:21',
        body: '@lorem @ipsum @dolor sit amet'
      };
      expected =
        '<p><span><a class="markdown-author-link" data-author="lorem">@lorem</a> <a class="markdown-author-link" data-author="ipsum">@ipsum</a> <a class="markdown-author-link" data-author="dolor">@dolor</a> sit amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);


      input = {
        author: 'foo50',
        permlink: 'bar50',
        last_update: '2019-05-10T09:15:21',
        body: '@lorem @ipsum @dolor \n @sit amet'
      };
      expected =
        '<p><span><a class="markdown-author-link" data-author="lorem">@lorem</a> <a class="markdown-author-link" data-author="ipsum">@ipsum</a> <a class="markdown-author-link" data-author="dolor">@dolor</a></span><br /><span>\n<a class="markdown-author-link" data-author="sit">@sit</a> amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);


      input = {
        author: 'foo51',
        permlink: 'bar51',
        last_update: '2019-05-10T09:15:21',
        body: '@lorem @ipsum @dolor \n @Sit amet'
      };
      expected =
        '<p><span><a class="markdown-author-link" data-author="lorem">@lorem</a> <a class="markdown-author-link" data-author="ipsum">@ipsum</a> <a class="markdown-author-link" data-author="dolor">@dolor</a></span><br /><span>\n<a class="markdown-author-link" data-author="sit">@Sit</a> amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('18- Should replace tags with link for given string', () => {
      let input = {
        author: 'foo52',
        permlink: 'bar52',
        last_update: '2019-05-10T09:15:21',
        body: 'lorem ipsum #dolor sit amet'
      };
      let expected =
        '<p><span>lorem ipsum <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo53',
        permlink: 'bar53',
        last_update: '2019-05-10T09:15:21',
        body: '#lorem ipsum #dolor sit amet'
      };
      expected =
        '<p><span><a class="markdown-tag-link" data-tag="lorem">#lorem</a> ipsum <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo54',
        permlink: 'bar54',
        last_update: '2019-05-10T09:15:21',
        body: '#lorem #ipsum #dolor sit amet'
      };
      expected =
        '<p><span><a class="markdown-tag-link" data-tag="lorem">#lorem</a> <a class="markdown-tag-link" data-tag="ipsum">#ipsum</a> <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo55',
        permlink: 'bar55',
        last_update: '2019-05-10T09:15:21',
        body: '#lorem #ipsum #dolor \n #sit amet'
      };
      expected =
        '<p><span><a class="markdown-tag-link" data-tag="lorem">#lorem</a> <a class="markdown-tag-link" data-tag="ipsum">#ipsum</a> <a class="markdown-tag-link" data-tag="dolor">#dolor</a></span><br /><span>\n<a class="markdown-tag-link" data-tag="sit">#sit</a> amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo56',
        permlink: 'bar56',
        last_update: '2019-05-10T09:15:21',
        body: '#lorem #ipsum #dolor \n #Sit amet'
      };
      expected =
        '<p><span><a class="markdown-tag-link" data-tag="lorem">#lorem</a> <a class="markdown-tag-link" data-tag="ipsum">#ipsum</a> <a class="markdown-tag-link" data-tag="dolor">#dolor</a></span><br /><span>\n<a class="markdown-tag-link" data-tag="sit">#Sit</a> amet</span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo57',
        permlink: 'bar57',
        last_update: '2019-05-10T09:15:21',
        body: 'you are #1'
      };
      expected = '<p>you are #1</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo58',
        permlink: 'bar58',
        last_update: '2019-05-10T09:15:21',
        body: 'you are #1 #steemit-promo'
      };
      expected =
        '<p><span>you are #1 <a class="markdown-tag-link" data-tag="steemit-promo">#steemit-promo</a></span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('19- Should replace both mentions and tags', () => {
      let input = {
        author: 'foo59',
        permlink: 'bar59',
        last_update: '2019-05-10T09:15:21',
        body: 'lorem ipsum #dolor sit @amet'
      };
      let expected =
        '<p><span>lorem ipsum <a class="markdown-tag-link" data-tag="dolor">#dolor</a> sit <a class="markdown-author-link" data-author="amet">@amet</a></span></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);

      input = {
        author: 'foo60',
        permlink: 'bar60',
        last_update: '2019-05-10T09:15:21',
        body: 'lorem ipsum @#dolor sit amet'
      };
      expected = '<p>lorem ipsum @#dolor sit amet</p>';
      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('20- Should not convert markdown links', () => {
      const input = {
        author: 'foo61',
        permlink: 'bar61',
        last_update: '2019-05-10T09:15:21',
        body: 'lorem [this error](https://images.ecency.com/0x0/https://d1vof77qrk4l5q.cloudfront.net/img/5752638e6965247789bc20cef34727263aaa41e1.png) ipsum'
      };
      expect(markdown2Html(input)).to.matchSnapshotJSON();
    });

    it('21- Should add https prefix', () => {
      const input = {
        author: 'foo62',
        permlink: 'bar62',
        last_update: '2019-05-10T09:15:21',
        body: '<a href="foo">foo</a>'
      };
      expect(markdown2Html(input).trim()).to.deep.equal(
        '<p><a class="markdown-external-link" data-href="https://foo">foo</a></p>'
      );
    });


    it('22- Should replace busy links properly', () => {
      const data = getTestData(
        'muratkbesiroglu',
        'sci-fi-novel-underground-city-part-13'
      );
      data['author'] = 'foo63';
      data['permlink'] = 'foo63';
      data['last_update'] = '2019-05-10T09:15:21';
      expect(markdown2Html(data)).to.matchSnapshotJSON();
    });

    it('23- Test with not obj param', () => {
      expect(markdown2Html('<a href="foo">foo</a> lorem ipsum **dolor** sit amet').trim()).to.deep.equal(
        '<p><a class="markdown-external-link" data-href="https://foo">foo</a> lorem ipsum <strong>dolor</strong> sit amet</p>'
      );
    });

    it('24- Should handle proposal vote links', () => {
      const input = {
        author: 'foo358',
        permlink: 'bar358',
        last_update: '2019-05-10T09:15:21',
        body: "[Approve](https://beta.hivesigner.com/sign/update-proposal-votes?proposal_ids=[39]&approve=true) [Unapprove](https://beta.hivesigner.com/sign/update-proposal-votes?proposal_ids=%5B41%5D&approve=false)"
      };
      const expected = '<p><a class="markdown-proposal-link" data-href="https://beta.hivesigner.com/sign/update-proposal-votes?proposal_ids=[39]&amp;approve=true" data-proposal="39">Approve</a> <a class="markdown-proposal-link" data-href="https://beta.hivesigner.com/sign/update-proposal-votes?proposal_ids=%5B41%5D&amp;approve=false" data-proposal="41">Unapprove</a></p>';
      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('25- Should handle twitch videos', () => {
      const input = {
        author: 'foo363',
        permlink: 'bar363',
        last_update: '2019-05-10T09:15:21',
        body: "https://www.twitch.tv/steemspacely"
      };
      const expected = '<p><a class="markdown-video-link markdown-video-link-twitch"><iframe frameborder="0" allowfullscreen="true" src="https://player.twitch.tv/?channel=steemspacely&amp;parent=ecency.com&amp;autoplay=false"></iframe></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('26- Should handle speak videos', () => {
      const input = {
        author: 'foo333',
        permlink: 'bar323',
        last_update: '2019-05-10T09:15:21',
        body: "[![](https://img.3speakcontent.online/xrhjxocx/post.png?v2)](https://3speak.online/watch?v=wehmoen/xrhjxocx)"
      };
      const expected = '<p><a class="markdown-video-link markdown-video-link-speak" data-embed-src="https://3speak.online/embed?v=wehmoen/xrhjxocx"><img class="no-replace video-thumbnail" src="https://images.ecency.com/p/2ufhwNgM3qHKBGVeU2TMMqPBjdB17MRuf4Q7vGrmGMtTn6yFtvW3Lt9t5v1c3so7UFhWDYh9B?format=match&amp;mode=fit" /><span class="markdown-video-play"></span></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('27- Should handle speak videos with different tld', () => {
      const input = {
        author: 'foo33399',
        permlink: 'bar32300',
        last_update: '2029-05-10T09:15:21',
        body: "[![](https://img.3speakcontent.co/blnmdkjt/post.png)](https://3speak.co/watch?v=theycallmedan/blnmdkjt) [Watch on 3Speak](https://3speak.co/watch?v=theycallmedan/blnmdkjt)"
      };
      const expected = '<p><a class="markdown-video-link markdown-video-link-speak" data-embed-src="https://3speak.co/embed?v=theycallmedan/blnmdkjt"><img class="no-replace video-thumbnail" src="https://images.ecency.com/p/CQdwDW6BZfWWtctopKyTJuDRdBH4KXwm9ijE6sZXe5MveWF3nUu4zXXBFUau8NS?format=match&amp;mode=fit" /><span class="markdown-video-play"></span></a> <a class="markdown-external-link" data-href="https://3speak.co/watch?v=theycallmedan/blnmdkjt">Watch on 3Speak</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('28- Should handle peakd post links', () => {
      const input = {
        author: 'foo3343',
        permlink: 'bar3243',
        last_update: '2019-05-10T09:15:21',
        body: "https://peakd.com/@demo/tests"
      };
      const expected = '<p><a class="markdown-post-link" data-tag="post" data-author="demo" data-permlink="tests">@demo/tests</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('29- Should handle youtu.be videos', () => {
      const input = {
        author: 'foo353',
        permlink: 'bar352',
        last_update: '2019-05-10T09:15:21',
        body: "https://youtu.be/_-6hJ8sltdI"
      };
      const expected = '<p><a class="markdown-video-link markdown-video-link-youtube" data-embed-src="https://www.youtube.com/embed/_-6hJ8sltdI?autoplay=1"><img class="no-replace video-thumbnail" src="https://images.ecency.com/p/S5Eokt4BcQdk7EHeT1aYjzebg2hC7hkthT45eEGc5AMBA14JMjkkxrUAj3mV5QR9D6zfstr?format=match&amp;mode=fit" /><span class="markdown-video-play"></span></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('30- Should handle external similar post links', () => {
      const input = {
        author: 'foo3534',
        permlink: 'bar3523',
        last_update: '2019-05-10T09:15:21',
        body: "[Voice: the criteria for success or failure](https://app.voice.com/post/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597)"
      };
      const expected = '<p><a class="markdown-external-link" data-href="https://app.voice.com/post/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597">Voice: the criteria for success or failure</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('31- Should handle external similar post links', () => {
      const input = {
        author: 'foo35341',
        permlink: 'bar35231',
        last_update: '2019-05-10T09:15:21',
        body: "[Voice: the criteria for success or failure](https://app.voice.com/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597)"
      };
      const expected = '<p><a class="markdown-external-link" data-href="https://app.voice.com/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597">Voice: the criteria for success or failure</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('32- Should handle whitelisted post links', () => {
      const input = {
        author: 'foo33435',
        permlink: 'bar32435',
        last_update: '2019-05-10T09:15:21',
        body: "https://peakd.com/tag/@demo/tests and https://steemit.com/test/@demo/post"
      };
      const expected = '<p><a class="markdown-post-link" data-tag="tag" data-author="demo" data-permlink="tests">@demo/tests</a> and <a class="markdown-post-link" data-tag="test" data-author="demo" data-permlink="post">@demo/post</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('33- Should handle whitelisted user links', () => {
      const input = {
        author: 'foo334352',
        permlink: 'bar324352',
        last_update: '2019-05-10T09:15:21',
        body: "https://peakd.com/@demo and https://steemit.com/@demo123"
      };
      const expected = '<p><a class="markdown-author-link" data-author="demo">@demo</a> and <a class="markdown-author-link" data-author="demo123">@demo123</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('34- Should handle ipfs links', () => {
      const input = {
        author: 'foo3493',
        permlink: 'bar3493',
        last_update: '2019-05-10T09:15:21',
        body: "this is link https://ipfs.io/ipfs/bafybeihbqfrcrbr6jkf77rdve3nbxjzkfgmeneaw2x5s43qdgpe26cha6q"
      };
      const expected = '<p>this is link <a data-href="https://ipfs.io/ipfs/bafybeihbqfrcrbr6jkf77rdve3nbxjzkfgmeneaw2x5s43qdgpe26cha6q" class="markdown-img-link"><img src="https://images.ecency.com/p/2923mN3pnd7PiPXAMdj9UuE6SsjvQJDHj5VpTTCNs3tkJu9JC9Pu9qXSi5Ys5PYtkaRx6ErTnFVzh1WQxWS45rvr6Q4rfUooAM242oyKeihwnx?format=match&amp;mode=fit" /></a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('34-1- Should detect # in ipfs links', () => {
      const input = {
        author: 'foo34936',
        permlink: 'bar34936',
        last_update: '2019-05-10T09:15:24',
        body: "this is a link https://ipfs.io/ipfs/bafybeihbqfrcrbr6jkf77rdve3nbxjzkfgmeneaw2x5s43qdgpe26cha6q/#home"
      };
      const expected = '<p>this is a link <a class="markdown-external-link" data-href="https://ipfs.io/ipfs/bafybeihbqfrcrbr6jkf77rdve3nbxjzkfgmeneaw2x5s43qdgpe26cha6q/#home">https://ipfs.io/ipfs/bafybeihbqfrcrbr6jkf77rdve3nbxjzkfgmeneaw2x5s43qdgpe26cha6q/#home</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('35- Should handle twitter links', () => {
      const input = {
        author: 'foo3321',
        permlink: 'bar3321',
        last_update: '2019-05-10T09:15:21',
        body: "this is link https://twitter.com/DeWaarheid_/status/1320603494836015105"
      };
      const expected = '<p>this is link <blockquote class="twitter-tweet"><p>https://twitter.com/DeWaarheid_/status/1320603494836015105</p>- <a href="https://twitter.com/DeWaarheid_/status/1320603494836015105">DeWaarheid_</a></blockquote></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('36- Should handle custom community links', () => {
      const input = {
        author: 'foo33210',
        permlink: 'bar33210',
        last_update: '2019-05-10T09:15:21',
        body: "this is link https://peakd.com/c/hive-106444/trending and markdown link [Manipulation Station](https://peakd.com/c/hive-122516/trending)"
      };
      const expected = '<p>this is link <a class="markdown-community-link" data-community="hive-106444" data-filter="trending">trending/hive-106444</a> and markdown link <a class="markdown-community-link" data-community="hive-122516" data-filter="trending">Manipulation Station</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('37- Should handle dapplr iframe', () => {
      const input = {
        author: 'foo332101',
        permlink: 'bar332101',
        last_update: '2019-05-10T09:15:21',
        body: "this is link <iframe src=\"https://cdn.dapplr.in/file/dapplr-videos/sandymeyer/pEm9SdqNYJ6vntQCAalWU6dNC9zegQVl.mp4\" ></iframe>"
      };
      const expected = '<p>this is link <iframe src="https://cdn.dapplr.in/file/dapplr-videos/sandymeyer/pEm9SdqNYJ6vntQCAalWU6dNC9zegQVl.mp4" sandbox frameborder="0" allowfullscreen="true"></iframe></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
    it('38- Should handle lbry.tv iframe', () => {
      const input = {
        author: 'foo332102',
        permlink: 'bar332102',
        last_update: '2019-05-10T09:15:21',
        body: "this is link <iframe id=\"lbry-iframe\" width=\"560\" height=\"315\" src=\"https://lbry.tv/$/embed/epic-drone-video-sunset-swiss/38f32ec6de375352512a01c37ec9ef5e7fc35958?r=4N4ga6kbnyKXLSUCHtyfF7zh57vvJwfu\" allowfullscreen></iframe> "
      };
      const expected = '<p>this is link <iframe src="https://lbry.tv/$/embed/epic-drone-video-sunset-swiss/38f32ec6de375352512a01c37ec9ef5e7fc35958?r=4N4ga6kbnyKXLSUCHtyfF7zh57vvJwfu" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('39- Should ignore profile page sections with copied links', () => {
      const input = {
        author: 'foo054',
        permlink: 'bar054',
        last_update: '2019-05-21T09:19:21',
        body: "<a href='https://ecency.com/@good-karma/wallet'>click here</a>"
      };
      const expected = '<p><a class="markdown-external-link" data-href="https://ecency.com/@good-karma/wallet">click here</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('40- Should handle archive.org iframe', () => {
      const input = {
        author: 'foo040',
        permlink: 'bar040',
        last_update: '2019-05-10T09:15:21',
        body: 'this is link <iframe src="https://archive.org/embed/VoyagetothePlanetofPrehistoricWomen" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>'
      };
      const expected = '<p>this is link <iframe src="https://archive.org/embed/VoyagetothePlanetofPrehistoricWomen" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="allowfullscreen"></iframe></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
  });

  describe('Sanitization', () => {

    it('1- Should remove javascript links', () => {
      const input = {
        author: 'foo64',
        permlink: 'bar64',
        last_update: '2019-05-10T09:15:21',
        body: "<a href='javascript:void(0)'>click here</a>"
      };
      const expected = "<p><a>click here</a></p>";

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('2- Should convert script tag to span', () => {
      const input = {
        author: 'foo65',
        permlink: 'bar65',
        last_update: '2019-05-10T09:15:21',
        body: `<script>document.getElementById('body').remove();</script>`
      };
      const expected = "document.getElementById('body').remove();";

      expect(markdown2Html(input)).to.deep.equal(expected);
    });


    it('3- Should remove not allowed attributes', () => {
      const input = {
        author: 'foo66',
        permlink: 'bar66',
        last_update: '2019-05-10T09:15:21',
        body: `<a title="Foo" onclick="document.bar()">Click</a>`
      };
      const expected = '<p><a title="Foo">Click</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });

    it('4- Should remove javascript links', () => {
      const input = {
        author: 'foo67',
        permlink: 'bar67',
        last_update: '2019-05-10T09:15:21',
        body: `<a title="Foo" href="javascript:void(0)">Click</a>`
      };
      const expected = '<p><a title="Foo">Click</a></p>';

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
  });

  describe('Test files', () => {
    it('1- Should catch images in table', () => {
      const data = getTestData(
        'steemitboard',
        'steemitboard-notify-dunsky-20181210t153450000z'
      );

      data['author'] = 'foo68';
      data['permlink'] = 'foo68';
      data['last_update'] = '2019-05-10T09:15:21';
      expect(markdown2Html(data)).to.matchSnapshotJSON();
    });
  });

  describe('Test legacy files', () => {
    const dataDir = `${__dirname}/data/legacy`;

    let files = fs.readdirSync(dataDir);

    let x = 150;

    for (let file of files) {
      if (file === '.DS_Store') {
        continue;
      }
      const fileContents = fs.readFileSync(path.join(dataDir, file), 'utf8');
      let data = JSON.parse(fileContents);

      const id = data['id'];
      const input = {
        author: 'foo' + x,
        permlink: 'bar' + x,
        last_update: '2019-05-10T09:15:21',
        body: data['input']
      };
      const expected = data['result'];

      it('ID: ' + id, function () {
        expect(markdown2Html(input)).to.deep.equal(expected);
      });

      x += 1;
    }
  });

  describe('forApp = false', () => {

    it('1', () => {
      const input = {
        author: 'foo1123',
        permlink: 'bar1123',
        last_update: '2019-05-10T09:15:21',
        body: "https://img.esteem.ws/bbq3ob1idy.png <a href=\"https://steemit.com/esteem/@esteemapp/esteem-monthly-guest-curation-program-4\">fooo</a> <a href=\"/esteem/@esteemapp/esteem-monthly-guest-curation-program-4\">bar</a> <a href=\"http://external.com/loromoro\">baz</a> #lorem @ipsum <a href='https://steemit.com/~witnesses'>vote me</a>"
      };
      const expected = '<p><img class="markdown-img-link" src="https://images.ecency.com/p/o1AJ9qDyyJNSpZWhUgGYc3MngFqoAMwgbeMkkd8SVxyfRVjiN?format=match&amp;mode=fit" /> <a href="/esteem/@esteemapp/esteem-monthly-guest-curation-program-4" class="markdown-post-link">fooo</a> <a href="/esteem/@esteemapp/esteem-monthly-guest-curation-program-4" class="markdown-post-link">bar</a> <a href="http://external.com/loromoro" class="markdown-external-link" target="_blank" rel="noopener">baz</a><span> <a class="markdown-tag-link" href="/trending/lorem">#lorem</a> <a class="markdown-author-link" href="/@ipsum">@ipsum</a> </span><a href="https://steemit.com/~witnesses" class="markdown-external-link" target="_blank" rel="noopener">vote me</a></p>';

      expect(markdown2Html(input, false)).to.deep.equal(expected);
    });
    it('2- Should handle external similar post links', () => {
      const input = {
        author: 'foo35342',
        permlink: 'bar35232',
        last_update: '2019-05-10T09:15:21',
        body: "[Voice: the criteria for success or failure](https://app.voice.com/post/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597)"
      };
      const expected = '<p><a href="https://app.voice.com/post/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597" class="markdown-external-link" target="_blank" rel="noopener">Voice: the criteria for success or failure</a></p>';

      expect(markdown2Html(input, false)).to.deep.equal(expected);
    });
    it('3- Should handle external similar post links', () => {
      const input = {
        author: 'foo35343',
        permlink: 'bar35233',
        last_update: '2019-05-10T09:15:21',
        body: "[Voice: the criteria for success or failure](https://app.voice.com/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597)"
      };
      const expected = '<p><a href="https://app.voice.com/@lukestokes/voice-the-criteria-for-success-or-failure-1597453134-597" class="markdown-external-link" target="_blank" rel="noopener">Voice: the criteria for success or failure</a></p>';

      expect(markdown2Html(input, false)).to.deep.equal(expected);
    });
  });

  describe('cleanReply', () => {
    it(' Should clean reply body', () => {
      const input = {
        parent_author: 'bar333',
        author: 'foo6401',
        permlink: 'bar6401',
        last_update: '2019-05-10T09:15:21',
        body: "hello lorem ipsum \n Posted using [Partiko Android](https://partiko.app/referral/aftabkhan10) \n Posted using [Dapplr](https://app.dapplr.in/L55YHRuX4jKJ2SSk8) \n  Posted Using [LeoFinance](https://leofinance.io/@taskmaster4450/is-defi-for-real) \n Posted with [STEMGeeks](https://stemgeeks.net) \n  <center><sub>[Posted Using Aeneas.Blog](https://www.aeneas.blog/@rollie1212/sryptobrewmaster-weekend-rewards-3)</sub></center> \n <center><sub>Posted via [weedcash.network](https://www.weedcash.network/@cryptounicorn420/thc-and-nft-rising-star-hive-blockchain-game)</sub></center>"
      };
      const expected = "<p>hello lorem ipsum</p>";

      expect(markdown2Html(input)).to.deep.equal(expected);
    });
  });

  describe('Webp support', () => {
    it('Should render images in webp format', () => {
      const input = 'lorem ipsum https://images.ecency.com/foobarbaz.jpg dolor sit amet';

      expect(markdown2Html(input, false, true)).to.matchSnapshotJSON();
    });
  });

});
