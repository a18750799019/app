<template>
  <div>
    <van-nav-bar class="nav" :title="title" left-text="返回" left-arrow   @click-left="$router.go(-1)">
    </van-nav-bar>
    <div v-if="title=='防震知识'" style="height:calc(100vh - 65px);overflow-y:auto;" class="padding-10 dddd padding-bottom-10">
      <article class="article" id="mp-editor">
          <!-- 政务处理 -->
          <p data-role="original-title" style="display:none">原标题：防震减灾基本常识，必须知道！</p>
            <p><span style="font-size: 16px;">地震，真的离我们不远。遇到的时候，应该怎么办呢？</span></p> 
            <p><span style="font-size: 16px;"><strong><span style="font-size: 16px;">一、地震时个人避险原则</span></strong></span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">（1）保持镇定；</span></p> 
            <p>（2）就地避险；</p> 
            <p>（3）切断火源；</p> 
            <p>（4）迅速撤离。</p> 
            <p><span style="font-size: 16px;">一般情况下，对只有轻微感觉的小地震不必大惊小怪。若发生破坏性地震，在震前的瞬间会出现地光、地声、初期震动等现象，这些现象被称为预警现象，从开始出现预警现象到房屋倒塌，一般有12秒钟左右的时间；作为个人，应当保持冷静，在12秒钟内作出正确躲藏的抉择。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">在教室：</span></strong></span>迅速的躲避在课桌下，等待震动过去再撤离到安全地方。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">在平房：</span></strong>可根据情况充分利用12秒钟时间跑出室外，来不及跑的可迅速躲在坚固的桌下、床下、家具旁及紧挨墙根处，趴在地下，闭目，用鼻子呼吸，使用座垫、被 盖等什物保护头部等要害部位，并用毛巾或衣物捂住口鼻，以隔挡呛入的灰尘。正在用火的应当立即熄灭炉火，随手关掉煤气或电源开关，然后迅速躲避。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">在楼房：</span></strong>要保持头脑清醒，迅速远离外墙及门窗，可选择厨房、浴室、厕所、楼梯间等开间小而不易塌落的空间避震，千万不要外逃或从楼上跳下，也不能使用电梯。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">在户外：</span></strong>要避开高大建筑物，尽量远离高压线及石化、化学、煤气等有毒的工厂或设施；在过桥时应紧紧抓住桥栏杆，待主震后立即向桥头移动；正在行驶的车辆应当紧急停车。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">在工作间：</span></strong>应迅速关掉电源和汽源闸门、开关，然后就近选择在机器、设备和办公家具下躲藏，防止次生灾害发生。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>在公共场所：</strong></span>在车站、剧院、教室、商店、地铁等场所的人员，切忌乱逃生，要保持镇静，就地择物（排椅、柜架、桌凳等）躲藏，伏而待定，然后听从指挥，有序撤离。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">二、自救与互救知识</span></strong></span></p> 
            <p><span style="font-size: 16px;">破坏性地震发生后，被埋压人员能否得到迅速、及时的救治，对于减少震灾死亡意义重大。据统计，唐山地震时被埋压者约57万人，通过自救、互救脱险的人数达 45万左右。一般来说，大地震后半小时内救出的被压人员生存率可达99%。由此可见，自救互救是减少伤亡的主要措施之一。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">自救：</span></strong></span>是指人们利用自身的条件排除危险，保存生命。震后，余震还会不断发生，你的环境还可能进一步恶化，你要尽量改善自己所处的环境，扩大活动空间，稳定下来，设法脱险，若无力自救脱险时，保持头脑清醒，不可大声呼救，要延长生命，保持体力，用敲击声求救，等待救援。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">互救：</span></strong>是指灾区幸免于难的人员，对被埋压人员的救助。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">救人原则：先救近，后救远；先救易，后救难；先救青壮年和医务人员，以增加帮手。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>救人方法：</strong></span>挖掘被埋压人员应保持支撑物，以防进一步倒塌伤人；使伤者先暴露头部，清除其口鼻内异物，保持呼吸畅通，如有窒息，立即进行人工呼吸；被压者不能 自行爬出时，不可生拉硬扯，以免造成进一步受伤，脊椎损伤者，搬运时，应用门板或硬担架；当发现一时无法救出的存活者，应立下标记，以待救援。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">三、怎样利用宏观异常主动避险？</span></strong></span></p> 
            <p><span style="font-size: 16px;"><span style="font-size: 16px;"></span>地震发生前会有宏观异常发生，这就需要我们千方百计地捕捉震前信息，主动避震自防。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">对动物异常</span></strong>，群众总结了这样的歌谣：震前动物有预兆，群测群防很重要；牛羊骡马不进圈，老鼠搬家往外逃；鸡飞上树猪乱拱，鸭不下水狗乱咬；冬眠蛇儿早出洞，鸽子惊飞不回巢；兔子竖耳蹦又撞，鱼儿惊慌水面跳；家家户户细留心，分析识别防范好。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">对地下水异常</span></strong></span>，群众也总结得好：井水是个宝，前兆来得早；无雨泉水浑，天旱井水冒；水位升降大，翻花冒气泡；有的变颜色，有的变味道；天变雨要到，水变地要闹；建立观测网，异常快报告。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"></span>除以上异常外，还有植物异常，如花草树木不合时令开花结果；气象异常，如严寒酷暑，洪涝干旱；电磁异常，如日光灯自亮，电磁器件奇变，收音通讯设备严重受干 扰；地表形变异常，如地面鼓包、裂缝、塌陷等都可能与地震有关。如发生这些异常现象，要及时向地方政府及有关部门报告，并及时果断地采取措施避震，都能起 到自我防御作用。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">四、震后如何保持良好的卫生习惯？</span></strong></span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"></span>地震灾区的每一位公民，都应力求保持乐观向上的情绪，注意身体健康。要根据气候的变化随时增减衣服，注意防寒保暖，预防感冒、气管炎、流行性感冒等呼吸道传染病，特别是老人和儿童要特别注意防止肺炎。要吃一些咸菜，补充体内因大量出汗而损失的盐分和水分，预防中暑。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">五、哪些水可以饮用？</span></strong></span></p> 
            <p><span style="font-size: 16px;"><span style="font-size: 16px;"></span>瓶装水、开水或经过消毒的水。不要使用污染的水洗碗、刷牙、洗菜、洗水果等。如果饮用已经开口的瓶装水，一定要消毒或烧开后饮用，开水1分钟就可以杀死绝大多数微生物。如果没有条件烧开水，可以使用专业人员提供的消毒片或含氯制剂进行消毒后饮用。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">六、震后如何预防肠道传染病</span></strong></span><strong><span style="font-size: 16px;">？</span></strong></span></p> 
            <p><span style="font-size: 16px;"><span style="font-size: 16px;"></span>保护水源，特别是生活饮用水免受污染。用漂白粉或漂白粉精片（净水片）消毒生活饮用水。注意饮食卫生。不喝生水，饭前便后洗手，不吃腐败变质或受潮霉变的食 品，不吃死亡的禽畜，不用脏水漱口或洗瓜果蔬菜，碗筷应煮沸或用消毒剂消毒，刀、砧板、抹布也应严格消毒，生熟食品应该分开存放，水产品和海鲜食物要煮熟 煮透再吃。注意环境卫生，消灭蚊蝇。不随地大小便，粪坑中加药杀蛆，动物尸体要深埋，有条件的可加放生石灰消毒，土层要夯实。要及时清除垃圾、污物，进行 环境消毒，管理好粪便、垃圾。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">七、家庭应准备哪些急救用品？</span></strong></span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"></span>在地震前，家庭应准备急救用品，如：斧头、铁铲、扫帚、螺丝刀、钳子、铁锤、扳手、绳子、塑料布、塑料带、厚底鞋、手套、蜡烛、打火机、水果刀、橡胶管、帐 篷、毯子或睡袋、手电筒、电池、基本的急救药物、防护眼镜、多用途灭火器、洗漱用品，将这些急救用具装在工具箱或渔具箱以便于携带以及防水。其他急救物品 包括：急救手册、剪刀、镊子、温度计、香皂、纸巾、防晒霜、一次性纸杯、水果刀、小塑料袋、安全别针、针线、医用冰袋、夹板等。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">日常生活消防常识</span></strong></span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">一、</span></strong></span>就寝前和外出前应做那些检查？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">检查电气、煤气有否关闭、烟火有否熄灭。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>二、</strong></span>居家逃生计划应怎么做？</span></p> 
            <p><span style="font-size: 16px;">1、应先熟悉所住楼层的各逃生路线，并随时做好迅速撤离的准备。</span></p> 
            <p><span style="font-size: 16px;">2、平日应与家人预先模拟火灾一旦发生时，应循什么途径逃生，以及到约定会合地点。3、应熟悉所住楼层内的消防设备及其使用方法。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>三、</strong></span>在厨房中应注意那些消防安全？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、烹饪时宜著短袖或合宜的长袖，避免烟火延烧衣物。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、烹煮食物时，不要任意离开，离开前须将烟火关闭。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、不要让小孩进入厨房玩耍。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>四、</strong></span>何种公共场所尽可能不要前往消费？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、只有单一出入口之场所。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、位于地下层之场所。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、用易燃物装修之场所。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">4、消防安全设备不合格之场所。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">5、防火区域受破坏之场所。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>五、</strong></span>下列是常见影响逃生之重要原因，切勿前往此公共场所消费。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、安全门上锁。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、平常应保持关闭之安全门却是随时打开。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、通往屋顶平台之安全门上锁。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">4、安全梯、通道（例如走廊）、楼梯等阻塞。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>六、</strong></span>为了自身安全，进入陌生场所应该先了解什么？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、避难逃生方向。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、安全门、梯位置，及是否关闭、是否上锁。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、查看消防栓、缓降机、救助袋等各项灭火、避难器具位置。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>七、</strong></span>灾害发生后应如何报案？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、应保持镇定，拨打119电话。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、述明详细灾害地点或附近目标。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、简述灾情状况。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">4、留下电话及地址以便进一步联系。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>八、</strong></span>发生火灾时你应注意的事项？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、切忌慌乱，判断火势来源，采取与火源相反方向逃生。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、切勿使用升降设备(电梯)逃生。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、切勿返入屋内取回贵重物品。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">4、夜间发生火灾时，应先叫醒熟睡的人，不要只顾自己逃生，并且尽量大声喊叫，以提醒其他人逃生。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>九、</strong></span>烹饪时油锅起火应如何处置？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、不可以用水来灭火。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、可用灭火器灭火。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、可盖上锅盖后再用湿毛巾覆盖，阻绝空气来灭火。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">4、速关闭煤气来源开关。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>十、</strong></span>消防栓使用方法？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、打开消防栓箱。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、延伸水带。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、转开止水阀。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>十一</strong></span>、干粉灭火器使用方法？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、将安全梢拉开。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、将皮管朝向火点。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、用力压下把手，选择上风位置接近火点，将干粉射入火焰基部。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">4、熄灭后并以水冷却除烟。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong><span style="font-size: 16px;">十二</span></strong></span>、逃生中如何避免火、烟之危害？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、 以湿毛巾掩口鼻呼吸，降低姿势，以减少吸入浓烟。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、于无浓烟的地方，将透明塑料袋充满空气套住头，以避免吸入有毒烟雾或气体。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、若逃生途中经过火焰 区，应先弄湿衣物或以湿棉被、毛毯裹住身体，迅速通过以免身体著火。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">4、烟雾弥漫中，一般离地面三十公分仍有残存空气可以利用，可采低姿势逃生，爬行时将 手心、手肘、膝盖紧靠地面，并沿墙壁边缘逃生，以免错失方向。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">5、火场逃生过程中，要一路关闭所有你背后的门，它能降低火和浓烟的蔓延速度。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>十三</strong></span>、火灾发生后如何防止烟流从门缝进来？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">利用胶布或沾湿毛巾、床单、衣服等塞住门缝。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>十四</strong></span>、当衣物着火时如何处置？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">最好脱下或就地卧倒，用手覆盖住脸部并翻滚压熄火焰，或跳入就近的水池，将火熄灭。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;"><span style="font-size: 16px;"><strong>十五</strong></span>、火灾时如果你被困在室内如何待救？</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">1、至易获救处待救（如靠近大马路之窗口附近，或与入口较近之房间等）。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">2、设法告知外面的人（用电话、手机通知119你受困的位置，或直接以衣物、灯光于窗口呼叫）。</span></p> 
            <p style="text-align: justify;"><span style="font-size: 16px;">3、防阻烟流串进来。</span></p> 
            </article>
    </div>
    <div v-if="title=='地震百科'" style="height:calc(100vh - 65px);overflow-y:auto;" class="padding-10 dddd padding-bottom-10">
      <div class="crigthy richtext">
            <div class="content_h2 bac_no">
              <h2 class="mar-t10">
                <a name="1"></a>地震 - 简介
              </h2>
            </div>
            <p>
              地震，是地球内部发生的急剧破裂产生的震波，在一定范围内引起地面振动的现象。地震(earthquake)就是地球表层的快速振动，在古代又称为地动。它就像海啸、龙卷风、冰冻灾害一样，是地球上经常发生的一种自然灾害。大地振动是地震最直观、最普遍的表现。在海底或滨海地区发生的强烈地震，能引起巨大的波浪，称为海啸。地震是极其频繁的，全球每年发生地震约五百五十万次。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="3"></a>地震 - 分类
              </h2>
            </div>
            <a name="5"></a>
            <h3>
              按形成原因分类
            </h3>
            <p>
              <strong>1、构造地震</strong> 是由于地下岩层的快速破裂和错动所造成的地震，占全球地震总数的90%以上。宁夏所发生的地震，绝大多数属于此种类型。由于构造地震频度高、强度大、破坏重，因此是地震监测预报、防灾减灾的重点对象。 <br>
            <strong>2、火山地震</strong> 是由于火山作用引起的地震，占全球发生地震数的7%左右。火山地震都发生在活火山地区，一般震级不大。 <br>
            <strong>3、陷落地震</strong> 是由于地层陷落(如喀斯特地形、矿坑下塌等)引起的地震，占全球地震总数的3％左右，其破坏范围非常有限。 <br>
            <strong>4、诱发地震</strong> 在特定的地区因某种地壳外界因素诱发（如陨石坠落、水库蓄水、深井注水）而引起的地震。
            </p>
            <a name="7"></a>
            <h3>
              按震源深度分类
            </h3>
            <p>
              <strong>1、浅源地震</strong> 震源深度小于60公里的地震，也称正常深度地震，占总数的3%。宁夏地震都是浅源地震。
            </p>
            <p>
              <strong>2、中源地震</strong> 震源深度在60公里至300公里之间的地震称为中源地震。
            </p>
            <p>
              <strong>3、深源地震</strong> 震源深度大于300公里的地震称为深源地震。已记录到的最深地震的震源深度约为700公里。
            </p>
            <a name="9"></a>
            <h3>
              按震中距分类
            </h3>
            <p>
              <strong>1、地方震</strong> 震中距小于100公里的地震；
            </p>
            <p>
              <strong>2、近震</strong> 震中距大于100公里、小于1000公里的地震；
            </p>
            <p>
              <strong>3、远震</strong> 震中距大于1000公里的地震。
            </p>
            <strong><a name="11"></a>
            <h3>
              按震级分类
            </h3>
            </strong>
            <p>
              <strong>1、小震</strong> 4级以下的地震；
            </p>
            <p>
              <strong>2、中强震</strong> 5-6级的地震；
            </p>
            <p>
              <strong>3、强震</strong> 7级以上的地震，其中8级以上的地震又称为特大地震。
            </p>
            <a name="13"></a>
            <h3>
              按破坏程度分类
            </h3>
            <p>
              <strong>1、一般破坏性地震</strong> 造成数人至数十人死亡，或直接经济损失在一亿元以下（含一亿元）的地震；
            </p>
            <p>
              <strong>2、中等破坏性地震</strong> 造成数十人至数百人死亡，或直接经济损失在一亿元以上（不含一亿元）、五亿元以下的地震；
            </p>
            <p>
              <strong>3、严重破坏性地震</strong> 人口稠密地区发生的七级以上地震、大中城市发生的六级以上地震，或者造成数百至数千人死亡，或直接经济损失在五亿元以上、三十亿元以下的地震；
            </p>
            <p>
              <strong>4、特大破坏性地震</strong> 大中城市发生的七级以上地震，或造成万人以上死亡，或直接经济损失在三十亿元以上的地震。
            </p>
            <a name="15"></a>
            <h3>
              其它
            </h3>
            <p>
              例如余震等。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="17"></a>地震 - 分布
              </h2>
            </div>
            <a name="19"></a>
            <h3>
              时间分布
            </h3>
            <p>
              地震活动在时间上具有一定的周期性。表现为在一定时间段内地震活动频繁，强度大，称为地震活跃期；而另一时间段内地震活动相对来讲频率少，强度小，称为地震平静期。
            </p>
            <a name="21"></a>
            <h3>
              地理分布
            </h3>
            <p>
              地震的地理分布受一定的地质条件控制，具有一定的规律。地震大多分布在地壳不稳定的部位，特别是板块之间的消亡边界，形成地震活动活跃的地震带。全世界主要有三个地震带：
            </p>
            <p>
              一是环太平洋地震带，包括南、北美洲太平洋沿岸，阿留申群岛、堪察加半岛，千岛群岛、日本列岛，经台湾再到菲律宾转向东南直至新西兰，是地球上地震最活跃的地区，集中了全世界80%以上的地震。本带是在太平洋板块和美洲板块、亚欧板块、印度洋板块的消亡边界，南极洲板块和美洲板块的消亡边界上。
            </p>
            <p>
              二是欧亚地震带，大致从印度尼西亚西部，缅甸经中国横断山脉，喜马拉雅山脉，越过帕米尔高原，经中亚细亚到达地中海及其沿岸。本带是在亚欧板块和非洲板块、印度洋板块的消亡边界上。
            </p>
            <p>
              三是中洋脊地震带，包含延绵世界三大洋（即太平洋、大西洋和印度洋）和北极海的中洋脊。中洋脊地震带仅含全球约5﹪的地震，此地震带的地震几乎都是浅层地震。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="23"></a>地震 - 表现
              </h2>
            </div>
            <p>
              地震发生时，最基本的现象是地面的连续振动，主要特征是明显的晃动。极震区的人在感到大的晃动之前，有时首先感到上下跳动。这是因为地震波从地内向地面传来，纵波首先到达的缘故。横波接着产生大振幅的水平方向的晃动，是造成地震灾害的主要原因。1960年智利大地震时，最大的晃动持续了3分钟。地震造成的灾害首先是破坏房屋和建筑物，如1976年中国河北唐山地震中，70%～80%的建筑物倒塌，人员伤亡惨重。地震对自然界景观也有很大影响。最主要的后果是地面出现断层和地震裂缝。大地震的地表断层常绵延几十至几百千米，往往具有较明显的垂直错距和水平错距，能反映出震源处的构造变动特征（见浓尾大地震，旧金山大地震）。但并不是所有的地表断裂都直接与震源的运动相联系，它们也可能是由于地震波造成的次生影响。特别是地表沉积层较厚的地区，坡地边缘、河岸和道路两旁常出现地裂缝，这往往是由于地形因素，在一侧没有依托的条件下晃动使表土松垮和崩裂。地震的晃动使表土下沉，浅层的地下水受挤压会沿地裂缝上升至地表，形成喷沙冒水现象。大地震能使局部地形改观，或隆起，或沉降。使城乡道路坼裂、铁轨扭曲、桥梁折断。在现代化城市中，由于地下管道破裂和电缆被切断造成停水、停电和通讯受阻。煤气、有毒气体和放射性物质泄漏可导致火灾和毒物、放射性污染等次生灾害。在山区，地震还能引起山崩和滑坡，常造成掩埋村镇的惨剧。崩塌的山石堵塞江河，在上游形成地震湖。1923年日本关东大地震时，神奈川县发生泥石流，顺山谷下滑，远达5千米。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="25"></a>地震 - 震级
              </h2>
            </div>
            <p>
              地震震级是根据地震时释放的能量的大小而定的。一次地震释放的能量越多，地震级别就越大。人类已有记录的震级最大的地震是1960年5月22日智利发生的9.5级地震，所释放的能量相当于一颗1800万吨炸药量的氢弹，或者相当于一个100万千瓦的发电厂40年的发电量。
            </p>
            <p>
              国际上一般采用美国地震学家查尔斯·弗朗西斯·芮希特和宾诺·古腾堡（Beno&nbsp;Gutenberg）于1935年共同提出的震级划分法，即通常所说的里氏地震规模。里氏规模是地震波最大振幅以10为底的对数，并选择距震中100千米的距离为标准。里氏规模每增强一级，释放的能量约增加32倍，相隔二级的震级其能量相差1000&nbsp;(~&nbsp;32&nbsp;x&nbsp;32)倍。
            </p>
            <p>
              小于里氏规模2.5的地震，人们一般不易感觉到，称为小震或者是微震；里氏规模2.5-5.0的地震，震中附近的人会有不同程度的感觉，称为有感地震，全世界每年大约发生十几万次；大于里氏规模5.0的地震，会造成建筑物不同程度的损坏，称为破坏性地震。里氏规模4.5以上的地震可以在全球范围内监测到。有记录以来，历史上最大的地震是发生在1960年5月22日19时11分南美洲的智利，根据美国地质调查所，里氏规模竟达9.5。
            </p>
            <p>
              1度：无感－仅仪器能记录到；
            </p>
            <p>
              2度：微有感－特别敏感的人在完全静止中有感；
            </p>
            <p>
              3度：少有感－室内少数人在静止中有感，悬挂物轻微摆动；
            </p>
            <p>
              4度：多有感－室内大多数人，室外少数人有感，悬挂物摆动，不稳器皿作响； <br>
            <br>
            5度：惊醒－室外大多数人有感，家畜不宁，门窗作响，墙壁表面出现裂纹； <br>
            <br>
            6度：惊慌－人站立不稳，家畜外逃，器皿翻落，简陋棚舍损坏，陡坎滑坡； <br>
            <br>
            7度：房屋损坏－房屋轻微损坏，牌坊，烟囱损坏，地表出现裂缝及喷沙冒水； <br>
            <br>
            8度：建筑物破坏－房屋多有损坏，少数破坏路基塌方，地下管道破裂； <br>
            <br>
            9度：建筑物普遍破坏－房屋大多数破坏，少数倾倒，牌坊，烟囱等崩塌，铁轨弯曲； <br>
            <br>
            10度：建筑物普遍摧毁－房屋倾倒，道路毁坏，山石大量崩塌，水面大浪扑岸； <br>
            <br>
            11度：毁灭－房屋大量倒塌，路基堤岸大段崩毁，地表产生很大变化； <br>
            <br>
            12度：山川易景－一切建筑物普遍毁坏，地形剧烈变化动植物遭毁灭； <br>
            <br>
            例如，1976年唐山地震，震级为7.8级，震中烈度为十一度；受唐山地震的影响，天津市地震烈度为八度，北京市烈度为六度，再远到石家庄、太原等就只有四至五度了。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="27"></a>地震 - 预报
              </h2>
            </div>
            <p>
              地震预报是针对破坏性地震而言的，是在破坏性地震发生前作出预报，使人们可以防备。地震预报要指出地震发生的时间、地点、震级，这就是地震预报的三要素。完整的地震预报这三个要素缺一不可。&nbsp;地震预报是世界公认的科学难题，在国内外都处于探索阶段，大约从20世纪五六十年代才开始进行研究。 中国地震预报的全面研究起步于1966年河北邢台地震，经过40多年的努力，取得了一定进展，曾经不同程度地预报过一些破坏性地震。但是实践表明，目前所观测到的各种可能与地震有关的现象，都呈现出极大的不确定性；所作出的预报，特别是短临预报，主要是经验性的。 地震预报按时间尺度可作如下划分：
            </p>
            <p>
              <strong>长期预报</strong> 是指对未来10年内可能发生破坏性地震的地域的预报。
            </p>
            <p>
              <strong>中期预报</strong> 是指对未来一二年内可能发生破坏性地震的地域和强度的预报。
            </p>
            <p>
              <strong>短期预报</strong> 是指对3个月内将要发生地震的时间、地点、震级的预报。
            </p>
            <p>
              <strong>临震预报</strong> 是指对10日内将要发生地震的时间、地点、震级的预报。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="29"></a>地震 - 发生前兆
              </h2>
            </div>
            <p>
              地震前自然界出现的可能与地震孕育、发生有关的各种征兆称作地震前兆。观测小地震的活动要使用地震仪；观测其他地震微观前兆则须使用前兆观测仪器，其种类很多。如观测和记录地壳形变的仪器有倾斜仪、自记水管仪、伸缩仪、水准仪、激光测距仪等；观测和记录地磁场变化的有磁变仪、核旋仪、地磁经纬仪等。观测地电、地应力、重力、水氡、水位、水质成分及其他微观前兆现象，也都有相应的仪器。&nbsp;大体有两类： <br>
            <strong>1、微观前兆</strong> 人的感官不易觉察，须用仪器才能测量到的震前变化。例如，地面的变形，地球的磁场、重力场的变化，地下水化学成分的变化，小地震的活动等。 观测微观前兆是科学家的工作；而发现临近地震前的宏观前兆，则既要靠科学家，也要靠广大群众。由于宏观前兆往往在临近地震发生时出现，因此，了解它的特点，学会识别它们，对防震减灾有重要作用。 <br>
            <strong>2、宏观前兆</strong> 人的感官能觉察到的地震前兆。它们大多在临近地震发生时出现。如井水的升降、变浑，动物行为反常，地声、地光等。 逃生方法
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="31"></a>地震 - 逃生原则
              </h2>
            </div>
            <p>
              要因地制宜，不要一定之规。震时，每个人的处境千差万别，避震方式不可能千篇一律。例如，是跑出室外还是在室内避震，就要看客观条件：住平房还是楼房，地震发生在白天还是晚上，房子是不是坚固，室内有没有避震空间，室外是否安全等等。 要行动果断，不要犹豫不决　避震能否成功，就在千钧一发之间，容不得瞻前顾后，犹豫不决。有的人跑出危房后又转身回去救人，结果自己也被埋压。记住，只有保存自己，才有可能救助别人。 在公共场所要听从指挥，不要擅自行动　擅自行动，盲目避震，只能遭致更大不幸。&nbsp;要采取有利于避震的姿势：如趴下，使身体重心降到最低，脸朝下，不要压住口鼻，以利呼吸； ——蹲下或坐下，尽量蜷曲身体。抓住身边牢固的物体，以防身体移位，暴露在坚实物体外而受伤。 保护身体的重要部位：保护头颈部：低头，用手护住头部和后颈；有可能时，用身边的物品，如枕头、被褥等顶在头上。保护眼睛：低头、闭眼，以防异物伤害； 保护口、鼻：有可能时，可用湿毛巾捂住口、鼻，以防灰土、毒气。<sup><a href="#hdtop_1" name="hdend_1" title="凤凰网，地震扫盲：地震自救大全，2008年05月13日"></a></sup>
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="33"></a>地震 - 震后救援
              </h2>
            </div>
            <a name="35"></a>
            <h3>
              救援原则
            </h3>
            <div style="width:101px;" id="changeTheId-wrap-img-1" class="img img_r">
              <img src="//static.tianqistatic.com/static/tianqi2018/images/default.jpg"><strong>海南救援队在北川的一次救援活动</strong>
            </div>
            <p>
              ①先救近处的人。不论是家人、邻居，还是萍水。相逢的路人，只要近处有人被埋压就要先救他们。相反，舍近求远，往往会错过救人良机，造成不应有的损失。
            </p>
            <p>
              ②先救容易救的人。这样可加快救人速度，尽快扩大救人队伍。
            </p>
            <p>
              ③先救青壮年。这样可使他们迅速在救灾中发挥作用。
            </p>
            <p>
              ④先救“生”，后救“人”。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="37"></a>地震 - 被困人员救护
              </h2>
            </div>
            <a name="39"></a>
            <h3>
              保护被困人员安全
            </h3>
            <p>
              的方法：①使用工具扒挖埋压物，当接近被埋人员时，不可用利器刨挖。&nbsp;②要特别注意不可破坏原有的支撑条件，以免对埋压者造成新的伤害。&nbsp;③扒挖过程中应尽早使封闭空间与外界沟通，以便新鲜空气注入。&nbsp;④扒挖过程中灰尘太大时，可喷水降尘，以免被救者和救人者窒息。&nbsp;⑤扒挖过程中可先将水、食品或药物等递给被埋压者使用，以增强其生命力。&nbsp;⑥施救时尽量先将被埋压者头部暴露出来，清除其口、鼻内的尘土，再使其胸腹和身体其他部分露出。&nbsp;⑦对于不能自行出来者，应使其尽量暴露全身再抬救出来，不可强拉硬拽。
            </p>
            <a name="41"></a>
            <h3>
              护理被困人员
            </h3>
            <p>
              ①蒙上他的双眼，使其避免强光的刺激。②不可让其突然进食过多。&nbsp;③要避免被救的人情绪过于激动，给予他必要的心理抚慰。&nbsp;④对受伤者，要就地做相应的紧急处理。
            </p>
            <a name="43"></a>
            <h3>
              护理伤员的原则
            </h3>
            <p>
              ①首先要仔细观察和询问伤员的伤情。&nbsp;②对于颈、腰部疼痛的患者特别要注意让他平卧，并尽量躺在硬板上；搬运时保证其头颅、颈部和躯体处于水平位置，以免造成脊髓损伤。&nbsp;③昏迷的伤员要平卧，且将其头部后仰、偏向一侧，及时清理口腔的分泌物，防止其呼吸道堵塞。&nbsp;④给伤员喝水时，一定要先从少量开始，以免大量饮水造成急性胃扩张，导致严重后果。&nbsp;⑤可用衣被、绳索、门板、木棍等组合成简易担架搬运伤员。
            </p>
            <div class="content_h2">
              <h2 class="mar-t10">
                <a name="45"></a>地震 - 赔偿问题
              </h2>
            </div>
            <p>
              问：很多人都购买了社会保险，那么因地震房屋倒塌造成的人员伤亡损失，社保可以赔付么？<br>
            答：社保中的医疗保险是“保而不包”，只提供基础医疗费用的报销，根据社保缴费的年限计算，一年报销上限几千到几万不等，报销的比例不高，并且有明确的报销限额，比如特定疾病要求等等。同时，一些地方的基本医疗保险政策规定，意外事故不包含在医保报销范围内。<sup><a href="#hdtop_2" name="hdend_2" title="安居房不安居 商业保险如何保障地震房倒塌"></a></sup>
            </p>        </div>
    </div>

    <van-overlay style="background:rgba(0,0,0,0.4)" :show="show"><van-loading style="height:100%;display:flex;align-items: center;justify-content: center;" type="spinner" color="#1989fa" /></van-overlay>
  </div>
</template>
<script>
import {businessApi} from "@/api";
export default {
  props:["title"],
  data(){
    return{
      show:false,
      data:"",
      ctitle:""
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.data = "";
      // vm.show=true;
      // businessApi.getListCommon({
      //   url:vm.$api.aidDecisionDetail,
      //   params:{
      //     ArticleId: vm.id
      //   }
      // }).then(data=>{
      //   vm.data = data.content
      //   .replace(/\/attachment/g,"http://www.dizhen.ac.cn/attachment")
      //   .replace(/\/zfzxx/g,"http://www.dizhen.ac.cn/zfzxx")
      //   .replace(/http:\/\/www.dizhen.ac.cnhttp:\/\/www.dizhen.ac.cn/g,"http://www.dizhen.ac.cn");
      //   vm.ctitle = data.title;
      //   vm.show = false;
      // })
  })
    }
  
    
}
</script>
<style lang="scss" scoped>
.dddd{
  ::v-deep img{width: 100%}
}
p{
  margin: .63em 0 1em 0;
  line-height: 1.5;
}
.content_h2 {
  height: 40px;
  background: rgba(51, 136, 255, 0.08);
  padding: 0 0 0 10px;
  clear: both;
  margin-bottom: 10px;
  line-height: 40px;
}
.richtext p {
    margin-bottom: 10px;
    line-height: 28px;
}
</style>
