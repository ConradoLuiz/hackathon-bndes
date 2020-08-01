import 'package:aula/JsonManager.dart';
import 'package:aula/Licao.dart';
import 'package:flutter/material.dart';
import 'package:async/async.dart';
import 'package:video_player/video_player.dart';

class SalaDeAula extends StatefulWidget {
  SalaDeAula({Key key}) : super(key: key);

  @override
  _SalaDeAulaState createState() => _SalaDeAulaState();
}

class _SalaDeAulaState extends State<SalaDeAula> {
  VideoPlayerController _controller;

  VoidCallback listener;
  int _counter = 0;

  JsonManager materia = JsonManager();

  _SalaDeAulaState() {}

  void initState() {
    listener = () {
      setState(() {});
    };
    createVideo();
  }

  void createVideo() {
    if (this._controller == null) {
      this._controller = VideoPlayerController.asset("assets/teste.mp4");
      this._controller.addListener(listener);
      this._controller.setVolume(1.0);
      this._controller.initialize();
    }
  }
  void playVideo(){
    this._controller.play();
  }
  void stopVideo(){
    this._controller.pause();
  }
  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(icon: Icon(Icons.arrow_back ) , onPressed: (){ 
          stopVideo();
          this._controller=null;
          Navigator.pop(context);
          }) ,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text("Diploma de Bolso"),
          Container(
            width: 30,
            height: 30,
            margin: EdgeInsets.only(left: 6.0, right: 45.0),
            child: Image.asset('assets/graduation.png'),
          )
        ]),

        backgroundColor: Colors.blue[700],
      ),
      backgroundColor: Colors.blue,
      body:SingleChildScrollView( child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Container(
             
              color: Colors.blue[700],
              child: Column(children: <Widget>[
                Container(child: AspectRatio(
                  aspectRatio: 16 / 9,
                  child: Container(
                    child: (this._controller == null
                        ? Container()
                        : VideoPlayer(this._controller)),
                  ),
                )),
                Row(
                   mainAxisAlignment: MainAxisAlignment.center,
                  //botao play e pause
                  children: <Widget>[
                    Container(
                      height: 30,
                      width: 100,
                      child: RaisedButton(
                      onPressed: () {
                        playVideo();
                      },
                      child: Center(child: Text("Play",
                        style: TextStyle(
                         fontSize: 20,
                          color: Colors.white,
                          fontWeight: FontWeight.bold),
                  
                  )),
                  color: Colors.blue[700],
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(25.0))),
            ),
                   Container(
                      height: 30,
                      width: 100,
                      child: RaisedButton(
                      onPressed: () {
                        stopVideo();
                      },
                      child: Center(child: Text("Stop",
                        style: TextStyle(
                         fontSize: 20,
                          color: Colors.white,
                          fontWeight: FontWeight.bold),
                  
                  )),
                  color: Colors.blue[700],
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(25.0))),
            ),

                  //fim botao play e pouse  
                  ]
                )
              ])),
          FutureBuilder(
              future: this.materia.loadCountryData(),
              builder: (context, snapshot) {
                if (snapshot == null) {
                  return Text("carregando");
                }
                return Text(this.materia.conteudo['licao']);
              }),

          //Text(this.a['licao']),
        ],
      )
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: () {
          playVideo();
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
