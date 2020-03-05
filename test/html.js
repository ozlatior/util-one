const assert = require("assert");

const html = require("../index.js").html;

describe("HTML utilities", () => {

	describe("removeComments()", () => {

		it("removes comment tags and content from html string", () => {
			let str = "<html><!-- this is the first comment --><body>foobar</body><!-- this is the second --></html>";
			let exp = "<html><body>foobar</body></html>";
			let res = html.removeComments(str);
			assert.equal(res, exp);
		});

		it("removes incomplete tags and content from html string", () => {
			let str = "<html>this is the first comment --><body>foobar</body><!-- this is the second</html>";
			let exp = "<body>foobar</body>";
			let res = html.removeComments(str);
			assert.equal(res, exp);
		});

		it("removes single ending tag and content from html string", () => {
			let str = "<html>this is the first comment --><body>foobar</body></html>";
			let exp = "<body>foobar</body></html>";
			let res = html.removeComments(str);
			assert.equal(res, exp);
		});

		it("removes single starting tag and content from html string", () => {
			let str = "<html><!--<body>foobar</body></html>";
			let exp = "<html>";
			let res = html.removeComments(str);
			assert.equal(res, exp);
		});

		it("removes comment tags and content from html string even containing other opening and closing tags", () => {
			let str = "<html><!-- this <!-- is the first --> comment --><body>foobar</body><!-- this is --> the second --></html>";
			let exp = "<html><body>foobar</body></html>";
			let res = html.removeComments(str);
			assert.equal(res, exp);
		});

		it("removes comment tags and content from html string and keeps content", () => {
			let str = "<html><!-- this is the first comment --><body>foobar</body><!-- this is the second --></html>";
			let exp = "<html> this is the first comment <body>foobar</body> this is the second </html>";
			let res = html.removeComments(str, true);
			assert.equal(res, exp);
		});

		it("removes incomplete tags and content from html string and keeps content", () => {
			let str = "<html>this is the first comment --><body>foobar</body><!-- this is the second</html>";
			let exp = "<html>this is the first comment <body>foobar</body> this is the second</html>";
			let res = html.removeComments(str, true);
			assert.equal(res, exp);
		});

		it("removes nested comment tags and content from html string keeps content", () => {
			let str = "<html><!-- this <!-- is the first --> comment --><body>foobar</body><!-- this is --> the second --></html>";
			let exp = "<html> this  is the first  comment <body>foobar</body> this is  the second </html>";
			let res = html.removeComments(str, true);
			assert.equal(res, exp);
		});

	});

	describe("extractComments()", () => {

		it("extracts comment tags and content from html string", () => {
			let str = "<html><!-- this is the first comment --><body>foobar</body><!-- this is the second --></html>";
			let exp = [ "<!-- this is the first comment -->", "<!-- this is the second -->" ];
			let res = html.extractComments(str);
			assert.deepEqual(res, exp);
		});

		it("does not extract incomplete tags and content from html string", () => {
			let str = "<html>this is the first comment --><body>foobar</body><!-- this is the second</html>";
			let exp = [];
			let res = html.extractComments(str);
			assert.deepEqual(res, exp);
		});

		it("does not extract single ending tag and content from html string", () => {
			let str = "<html>this is the first comment --><body>foobar</body></html>";
			let exp = [];
			let res = html.extractComments(str);
			assert.deepEqual(res, exp);
		});

		it("does not extract single starting tag and content from html string", () => {
			let str = "<html><!--<body>foobar</body></html>";
			let exp = [];
			let res = html.extractComments(str);
			assert.deepEqual(res, exp);
		});

		it("extracts comment tags and content from html string even containing other opening and closing tags", () => {
			let str = "<html><!-- this <!-- is the first --> comment --><body>foobar</body><!-- this is --> the second --></html>";
			let exp = [ "<!-- this <!-- is the first --> comment -->", "<!-- this is --> the second -->" ];
			let res = html.extractComments(str);
			assert.deepEqual(res, exp);
		});

	});

	describe("decodeEntities()", () => {

		it("Decodes all named entities successfully", () => {
			let str = "&nbsp;&nbsp;&nbsp; &copy; 2020 &amp; &quot; &lt; &gt; &apos; &cent; &pound; &yen; &euro; &reg;";
			let exp = "    © 2020 & \" < > ' ¢ £ ¥ € ®";
			let res = html.decodeEntities(str);
			assert.equal(res, exp);
		});

		it("Decodes numerical entities successfully", () => {
			let str = "&#21704;&#21704;&nbsp;&#39;&#36825;&#20010;&#39;&amp;&quot;&#37027;&#20010;&quot;&#22909;&#29609;&lt;&gt;";
			let exp = "哈哈 '这个'&\"那个\"好玩<>";
			let res = html.decodeEntities(str);
			assert.equal(res, exp);
		});

	});

});
