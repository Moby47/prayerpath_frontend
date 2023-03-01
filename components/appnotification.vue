<template>
    <div>

                <!-- General info-->
                <div id="info" class="notification-box">
                    <div class="notification-dialog ios-style">
                        <div class="notification-header">
                            <div class="right">
                                <span>just now</span>
                            </div>
                        </div>
                        <div class="notification-content">
                            <div class="in">
                                <h3 class="subtitle">Offline mode</h3>
                                <div class="text">
                                    {{notificationMessage}}
                                </div>
                            </div>
      <img src="https://media0.giphy.com/media/MAtrUwwKKcMzuMUKU8/giphy.gif?cid=ecf05e478i7gua81235gz0qg9p3nisjrdl00vvaonm2pfu6m&rid=giphy.gif&ct=g" alt="image" class="imaged w64">
                        </div>
                    </div>
                </div>
                <!-- * ios style -->


                 <!-- No record-->
                 <div id="noRecord" class="notification-box">
                    <div class="notification-dialog ios-style">
                        <div class="notification-header">
                            <div class="right">
                                <span>just now</span>
                            </div>
                        </div>
                        <div class="notification-content">
                            <div class="in">
                                <h3 class="subtitle">No record found</h3>
                                <div class="text">
                                    {{notificationMessage}}
                                </div>
                            </div>
      <img src="https://media3.giphy.com/media/K4849SW5Womc0/200w.webp?cid=ecf05e47f4gjmmxhjwr8lt0oiykjeoqz9tv890pczbk7ec7x&rid=200w.webp&ct=g" alt="image" class="imaged w64">
                        </div>
                    </div>
                </div>
                <!-- * ios style -->
                


              

    </div>
</template>

<script>
export default {
    name: 'appnotification',

    props: {
        notificationMessage: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        // Your data properties here
       // notificationMessage:'',
      }
    },
  methods: {

    showNotification(notificationId) {
      var a = "#" + notificationId;
      var time = 5000;
    $(".notification-box").removeClass("show");
    setTimeout(() => {
        $(a).addClass("show");
    }, 300);
    if (time) {
        time = time + 300;
        setTimeout(() => {
            $(".notification-box").removeClass("show");
        }, time);
    }

    },

  },

}
</script>
