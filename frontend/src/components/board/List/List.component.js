export default {
  name: 'list',
  components: {},
  props: [],
  data () {
    return {
        boards : {}
    }
  },
  computed: {

  },
  created: function () {
    this.$http.get(`/api/board/list`).then((response) => {

      const resDataLength = response.data.length;
      for(let i = 0; i< resDataLength; i++){
        let date = new Date(response.data[i].registedAt),
          year = date.getFullYear() ,
          month = date.getMonth() + 1,
          day = date.getDate(),

          hour = date.getHours(),
          minute = date.getMinutes(),
          second = date.getSeconds()
        ;

        month = addZero(month);
        day = addZero(day);
        hour = addZero(hour);
        minute = addZero(minute);
        second = addZero(second);

        response.data[i].registedAt = [year , month , day].join("-")
         + " " + [hour,minute,second].join(":");
      }
      this.boards = response.data;

    }).catch((err) => {
      alert('게시글을 가져올 수 없습니다.');
      this.$router.push('/board/list')
    });

    function addZero( value ){
      return value.toString().length < 2 ? '0' + value : value;
    }
  },
 beforeCreate: function () {
   if (!this.$session.exists()) {

     this.$router.push('/member/login');
   }
 },
  mounted () {

  },
  methods: {
    boardList(){
      this.$http.get('/board/list')
        .then((response) => {
          this.board = response.data;
        })

    },
    writeBoard(){
      this.$router.push('/board/write')
    }
  }
}
