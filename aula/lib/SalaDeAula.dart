import 'package:aula/Arq.dart';
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
  String aula;
  JsonManager materia = JsonManager();
  int carregarVideo=0;

  _SalaDeAulaState(){
    
    
  } 

  void initState() {
    Arq().readCounter().then((dado){
      setState(() {
        this.aula =dado;
        
      });
      
    });

    listener = () {
      setState(() {});
    };
    
  }

  void createVideo() {
    if (this._controller == null) {
      this._controller = VideoPlayerController.asset(this.materia.conteudo["video"+this.aula]);
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
    
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(icon: Icon(Icons.arrow_back ) , onPressed: (){ 
          stopVideo();
          this._controller=null;
          Navigator.pop(context);
          }) ,
        
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
                        :
                         VideoPlayer(this._controller)                        
                      ),
                  ),
                )),
                Row(
                   mainAxisAlignment: MainAxisAlignment.center,
                  //botao play e pause
                  children: <Widget>[
                    Container(
                      margin: EdgeInsets.fromLTRB(0.0, 8.0, 3.0, 8.0),
                      height: 40,
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
                  color: Colors.blue[800],
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(25.0))),
            ),
                   Container(
                     margin: EdgeInsets.fromLTRB(3.0, 8.0, 0.0, 8.0),
                      height: 40,
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
                  color: Colors.blue[800],
                  shape: new RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(25.0))),
            ),

                  
                  ]
                )
              ])),
          FutureBuilder(
              future: this.materia.loadData(),
              builder: (context, snapshot) {
                if (snapshot == null || this.aula==null) {
                  return Text("carregando");
                }
                 createVideo();
                return Container(padding:EdgeInsets.fromLTRB(8.0, 6.0, 8.0, 8.0) , child:Text(this.materia.conteudo["texto"+this.aula]));
              }),

       
        ],
      )
      ),
 
    );
  }
}
