import 'dart:convert';
import 'dart:io';
import 'dart:async';
import 'package:sms/sms.dart';
import 'package:aula/SmsBotao.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:url_launcher/url_launcher.dart';

class Mensagem extends StatefulWidget {
  Mensagem({Key key}) : super(key: key);
  @override
  _MensagemState createState() => _MensagemState();
}

class _MensagemState extends State<Mensagem> {
  
  //  essa é uma lista de controladores para pegar os textos nos campos de escrita
  List<TextEditingController> controller=List();

  List _toDoList = [];

  
  _MensagemState() {
   
    
    this.controller.add(TextEditingController());
    this.controller.add(TextEditingController());
    this.controller.add(TextEditingController());
  }
 // essa funçao adiciona o numero na lista de contatos
  void AddNumero(){
    if(this.controller[0].text!="" && this.controller[1].text!=""){
      setState(() {
        Map<String,dynamic> novoContato=Map();
        novoContato["nome"]=this.controller[0].text;
        novoContato["numero"]=this.controller[1].text;
        this.controller[0].text="";
        this.controller[1].text="";
        this._toDoList.add(novoContato);
        saveData();
    });
    }

  }
  @override


  //essa função foi usada para fazer a primeira leitura do json
  void initState() {
    // TODO: implement initState
    super.initState();
    readData().then((data){
      setState(() {
        
     
      _toDoList=json.decode(data);
       });
    });
  }

//envia mensagem
  void sendMensagem(){
    if(this.controller[2].text!="" && this.controller[1].text!=""){
      setState(() {
        Map<String,dynamic> novaMensagem=Map();
        novaMensagem["mensagem"]=this.controller[2].text;
        novaMensagem["numero"]=this.controller[1].text;
        this.controller[2].text="";
        this.controller[1].text="";
        SmsSender sender = new SmsSender();
        sender.sendSms(new SmsMessage(novaMensagem["numero"], novaMensagem["mensagem"]));
    });
    
    }
    

  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue[700],
        title: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text("Diploma de Bolso"),
          Container(
            width: 30,
            height: 30,
            margin: EdgeInsets.only(left: 6.0, right: 45.0),
            child: Image.asset('assets/graduation.png'),
          )
        ]),
      ),
      backgroundColor: Colors.blue,
      body:  Center(
              child: Column(children: <Widget>[
        Container(
          color: Colors.blue[600],
          margin: EdgeInsets.fromLTRB(2.0, 5.0, 2.0, 10.0),
          child:  TextField(
            controller: controller[0],
            decoration: InputDecoration(
              labelText: 'Nome',
              border: OutlineInputBorder(),
              labelStyle: TextStyle(color: Colors.black)
            )
          ),
          
        ),
        
        Container(
          color: Colors.blue[600],
          margin: EdgeInsets.fromLTRB(2.0, 5.0, 2.0, 10.0),
          child:  TextField(
            controller: controller[1],
            decoration: InputDecoration(
              labelText: 'Numero',
              border: OutlineInputBorder(),
              labelStyle: TextStyle(color: Colors.black)
            )
          ),
          
        ),

       
        
        RaisedButton(color:Colors.blue[700],child: Text("ADD"), onPressed: AddNumero),
       //aqui criamos a lista de botoes dos contatos
        Expanded(child:ListView.builder(
          
          itemCount:this._toDoList.length
          ,itemBuilder: (context,index){
            return SmsBotao(this._toDoList[index],this.controller).botao();
            
          })
          ),


        SingleChildScrollView( child:
          Container(
          color: Colors.blue[600],
          margin: EdgeInsets.fromLTRB(2.0, 5.0, 2.0, 10.0),
          child:  TextField(
            controller: controller[2],
            decoration: InputDecoration(
              labelText: 'mensagem',
              border: OutlineInputBorder(),
              labelStyle: TextStyle(color: Colors.black)
            )
          ),
          
        ),
        )
       
      ])),
      
      
    );
  }
 

/* essas funçoes foram colocada para a leitura e escrita no json.
obs: se der tempo criar uma classe para essa leitura 
*/
 Future<File> getFile() async {
    final directory = await getApplicationDocumentsDirectory();
    String a ="${directory}/data1.json";
    print("a");
    return File("${directory.path}/data1.json");
  }

  Future<File> saveData() async {
    String data = json.encode(_toDoList);
    final file = await getFile();
    return file.writeAsString(data);
  }

  Future<String> readData() async {
    try {
      final file = await getFile();
      return file.readAsString();
    } catch (e) {
      return null;
    }
  }




}
