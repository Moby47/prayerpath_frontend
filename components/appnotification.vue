<template>
    <div>

        <!--Currently used only in the home page. I found a better way to proceed - Legacy ..-->

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
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWE5YTIyYmIxNGEyOGE1ODc2YmY1MzJlNTYyYzVhMjFlMDQ2ZGU4NSZjdD1n/MAtrUwwKKcMzuMUKU8/giphy.gif" alt="image" class="imaged w64">
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
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTU5NTJhMTdjZTczZDhlMTlmNGI3ZjQ4NGM2M2IwNDU5MGQxZTI1OSZjdD1n/K4849SW5Womc0/giphy.gif" alt="image" class="imaged w64">
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
