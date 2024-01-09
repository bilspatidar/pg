<style>
    .textArea{
        margin-left:40px !important;
    }
	.url {
    font-size: 15px;
    text-align: left;
    padding: 15px 15px;
    border-radius: 3px;
    font-family: 'Roboto Mono';
	color:#222;
}

div.card .card-header-primary {
    background: linear-gradient(60deg,#ab47bc,#7b1fa2);
    box-shadow: 0 5px 20px 0 rgba(0,0,0,.2), 0 13px 24px -11px rgba(156,39,176,.6);
}

div.card .card-header-danger {
    background: linear-gradient(60deg,#FF31FA,#6C73FF);
    box-shadow: 0 5px 20px 0 rgba(0,0,0,.2), 0 13px 24px -11px rgba(244,67,54,.6);
}


.card-nav-tabs .card-header {
   /* margin-top: -30px!important;*/
}

.card .card-header .nav-tabs {
    padding: 0;
}
.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}

.nav-tabs .nav-item {
    margin-bottom: -1px;
}

.nav-tabs .nav-item .nav-link.active {
    background-color: hsla(0,0%,100%,.2);
    transition: background-color .3s .2s;
}

.nav-tabs .nav-item .nav-link{
    border: 0!important;
    color: #fff!important;
    font-weight: 500;
}

.nav-tabs .nav-item .nav-link {
    color: #fff;
    border: 0;
    margin: 0;
    border-radius: 3px;
    line-height: 24px;
    text-transform: uppercase;
    font-size: 12px;
    padding: 10px 15px;
    background-color: transparent;
    transition: background-color .3s 0s;
}

.nav-link{
    display: block;
}

.nav-tabs .nav-item .material-icons {
    margin: -1px 5px 0 0;
    vertical-align: middle;
}

.nav .nav-item {
    position: relative;
}
</style>
<div class="container-fluid">

<div class="row">
     <div class="col-md-12 text-center" >
       <h2><?php echo $api[0]->tittle;?></h2> 
    </div>
</div>
<hr/>
<?php if(!empty($api[0]->description)){ ?>
<div class="row mt-4">
	<div class="col-md-12 m-2" style="text-align:justify"><?php echo $api[0]->description;?></div>
</div>
<?php } ?>
<?php if(!empty($api[0]->method) && !empty($api[0]->url)){ ?>
<div class="row ">
	<div class="col-md-12">
	<div class="card card-nav-tabs">
			<div class="card-header card-header-primary">
				<!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" -->
				<div class="nav-tabs-navigation">
					<div class="nav-tabs-wrapper">
						<ul class="nav nav-tabs" data-tabs="tabs">
							<li class="nav-item">
								<button class="nav-link active" data-bs-target="#requestUrl" data-bs-toggle="tab">Requested Url</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="card-body ">
				<div class="tab-content">
					<div class="tab-pane active" id="requestUrl">
					<div align="right"><button class="btn btn-sm btn-primary pull-right" onclick="CopyToClipboard('url')" ><span class="fa fa-copy"></span></button></div>
						<div id="url">
						<?php if($api[0]->method=="Get"){
								$color = "primary";
							}elseif($api[0]->method=="Post"){
								$color = "success";
							}?>
						<span class="badge bg-<?=$color?>"><?php echo $api[0]->method;?></span><span class="url"><?php echo $api[0]->url;?></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php } ?>
<?php if(!empty($api[0]->header)){ ?>
<div class="row mt-4">
	<div class="col-md-12">
	<div class="card card-nav-tabs">
			<div class="card-header card-header-danger">
				<!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" -->
				<div class="nav-tabs-navigation">
					<div class="nav-tabs-wrapper">
						<ul class="nav nav-tabs" data-tabs="tabs">
						<?php if(!empty($api[0]->header)){ ?>
							<li class="nav-item">
								<button class="nav-link active" data-bs-toggle="tab" data-bs-target="#header">Header</button>
							</li>
						<?php } ?>
						<?php if(!empty($api[0]->request)){ ?>
							<li class="nav-item">
								<button class="nav-link " data-bs-toggle="tab" data-bs-target="#request">Request</button>
							</li>
						<?php } ?>
						<?php if(!empty($api[0]->response)){ ?>
							<li class="nav-item">
								<button class="nav-link" data-bs-toggle="tab" data-bs-target="#response">Response</button>
							</li>
						<?php } ?>
						<?php if(!empty($api[0]->example)){ ?>
							<li class="nav-item">
								<button class="nav-link" data-bs-toggle="tab" data-bs-target="#example">Example</button>
							</li>
						<?php } ?>
						</ul>
					</div>
				</div>
			</div>
			<div class="card-body ">
				<div class="tab-content">
					<div class="tab-pane fade  show active" id="header">
						<div class=" m-2 textArea" id="head"><?php echo $api[0]->header;?></div>
					</div>
					<div class="tab-pane fade" id="request">
						<div class=" m-2 textArea" id="req"><?php echo $api[0]->request;?></div>
					</div>
					<div class="tab-pane fade" id="response">
						<div class=" m-2 textArea" id="res"><?php echo $api[0]->response;?></div>
					</div>
					<div class="tab-pane fade bg-dark" id="example">
						<div align="right"><button class="btn btn-sm btn-primary pull-right" onclick="CopyToClipboard('exe')"><span class="fa fa-copy"></span></button></div>
						<div class=" m-2 textArea" id="exe"><?php echo $api[0]->example;?></div>
					</div>
				</div>
			</div>
		</div>
	<!--
		<div class="card">
            <div class="card-body pt-3">
				<ul class="nav nav-tabs nav-tabs-bordered">
                <li class="nav-item">
					<button class="nav-link active" data-bs-toggle="tab" data-bs-target="#header">Header</button>
                </li>
                <li class="nav-item">
					<button class="nav-link " data-bs-toggle="tab" data-bs-target="#request">Request</button>
                </li>
                <li class="nav-item">
					<button class="nav-link" data-bs-toggle="tab" data-bs-target="#response">Response</button>
                </li>
				</ul>
				<div class="tab-content pt-2">
					<div class="tab-pane fade  show active" id="header">
						<div align="right"><button class="btn btn-sm btn-primary pull-right" onclick="CopyToClipboard('head')"><span class="fa fa-copy"></span></button></div>
						<div class=" m-2 textArea" id="head"><?php echo $api[0]->header;?></div>
					</div>
					<div class="tab-pane fade" id="request">
						<div align="right"><button class="btn btn-sm btn-primary pull-right" onclick="CopyToClipboard('req')"><span class="fa fa-copy"></span></button></div>
						<div class=" m-2 textArea" id="req"><?php echo $api[0]->request;?></div>
					</div>
					<div class="tab-pane fade" id="response">
						<div align="right"><button class="btn btn-sm btn-primary pull-right" onclick="CopyToClipboard('res')"><span class="fa fa-copy"></span></button></div>
						<div class=" m-2 textArea" id="res"><?php echo $api[0]->response;?></div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</div>
<?php } ?>
<?php if(!empty($api[0]->details)){ ?>
<div class="row mt-4">
	<div class="col-md-12 m-2" style="text-align:justify"><?php echo $api[0]->details;?></div>
</div>
<?php } ?>
</div>
<script type="text/javascript">
function setHeight(fieldId){
    document.getElementById(fieldId).style.height = document.getElementById(fieldId).scrollHeight+'px';
}
setHeight('textBox1');
setHeight('textBox2');
setHeight('textBox3');
setHeight('textBox4');

function CopyToClipboard(id)
{
var r = document.createRange();
r.selectNode(document.getElementById(id));
window.getSelection().removeAllRanges();
window.getSelection().addRange(r);
document.execCommand('copy');
window.getSelection().removeAllRanges();
}
</script>