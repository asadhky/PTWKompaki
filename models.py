from extensions import db  # 从extensions.py导入db实例

class Code(db.Model):
    __tablename__ = 'code'
    id = db.Column(db.Integer, primary_key=True)
    code_name = db.Column(db.String(255), nullable=False)
    code_content = db.Column(db.Text, nullable=False)

class Icon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_path = db.Column(db.String(200), nullable=False)
    link_url = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)

class Layout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    src = db.Column(db.String(200), nullable=False)
    alt = db.Column(db.String(100), nullable=False)
    label = db.Column(db.String(100), nullable=False)
    href = db.Column(db.String(200), nullable=False)
    container_id = db.Column(db.String(100), nullable=False)

class AppIcon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_path = db.Column(db.String(200), nullable=False)
    link_url = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
