/* Definición Léxica */
%lex

%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario de una linea


//palabras reservadas
"true"              return 'RTRUE';
"FALSE"             return 'RFALSE';
"("					return 'PARIZQ';
")"					return 'PARDER';

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIV';

"!="				return 'DIFDE';
"=="				return 'IGIG';
">"					return 'MAY';
"<"					return 'MEN';

"&&"				return 'AND';
"||"				return 'OR';
"!"					return 'NEG';


[0-9]+"."[0-9]+ 				return 'DECIMAL';
[0-9]+              				return 'ENTERO';


<<EOF>>				return 'EOF';
.	{ 
    //KeepData.default.getInstance().addError(TipoError.LEXICO, "No se esperaba '"+yytext+"'", yylloc.first_line, yylloc.first_column);
    console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
    }			

/lex

/* Asociación de operadores y precedencia */


/* Precedencia */
%left 'OR'   
%left 'AND'
%left 'IGIG' 'DIFDE'
%nonassoc 'MEN' 'MAY' 
%left 'MAS' 'MENOS'
%left 'POR' 'DIV'
%right UMINUS  'NEG'
%left 'PARIZQ' 'PARDER'


%start inicio

%% /* Definición de la gramática */

inicio : expr EOF
    | EOF 
    ;

expr:   arithmetic
    |   logical
    |   relational
    |   unary
    |   constant
    |   PARIZQ expr PARDER
    ;

unary:  MENOS expr %prec UMINUS  
    |   NEG expr
    ;


arithmetic: expr MAS expr
        |   expr MENOS expr
        |   expr POR expr
        |   expr DIV expr
        ;

logical:    expr AND expr
        |   expr OR expr
        ;

relational: expr IGIG expr
        |   expr DIFDE expr
        |   expr MEN expr
        |   expr MAY expr
        ;


constant:   ENTERO
        |   DECIMAL
        |   RTRUE
        |   RFALSE
        ;


